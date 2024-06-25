"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = exports.Link = exports.Node = exports.SEP = void 0;
const process_1 = require("./process");
const buffer_1 = require("./internal/buffer");
const constants_1 = require("./constants");
const events_1 = require("events");
const Stats_1 = require("./Stats");
const { S_IFMT, S_IFDIR, S_IFREG, S_IFLNK, O_APPEND } = constants_1.constants;
const getuid = () => process_1.default.getuid?.() ?? 0;
const getgid = () => process_1.default.getgid?.() ?? 0;
exports.SEP = "/";
/**
 * Node in a file system (like i-node, v-node).
 */
class Node extends events_1.EventEmitter {
    constructor(ino, perm = 0o666) {
        super();
        // User ID and group ID.
        this.uid = getuid();
        this.gid = getgid();
        this.atime = new Date();
        this.mtime = new Date();
        this.ctime = new Date();
        this.perm = 0o666; // Permissions `chmod`, `fchmod`
        this.mode = S_IFREG; // S_IFDIR, S_IFREG, etc.. (file by default?)
        // Number of hard links pointing at this Node.
        this.nlink = 1;
        this.perm = perm;
        this.mode |= perm;
        this.ino = ino;
    }
    getString(encoding = "utf8") {
        return this.getBuffer().toString(encoding);
    }
    setString(str) {
        // this.setBuffer(bufferFrom(str, 'utf8'));
        this.buf = (0, buffer_1.bufferFrom)(str, "utf8");
        this.touch();
    }
    getBuffer() {
        if (!this.buf)
            this.setBuffer((0, buffer_1.bufferAllocUnsafe)(0));
        return (0, buffer_1.bufferFrom)(this.buf); // Return a copy.
    }
    setBuffer(buf) {
        this.buf = (0, buffer_1.bufferFrom)(buf); // Creates a copy of data.
        this.touch();
    }
    getSize() {
        return this.buf ? this.buf.length : 0;
    }
    setModeProperty(property) {
        this.mode = (this.mode & ~S_IFMT) | property;
    }
    setIsFile() {
        this.setModeProperty(S_IFREG);
    }
    setIsDirectory() {
        this.setModeProperty(S_IFDIR);
    }
    setIsSymlink() {
        this.setModeProperty(S_IFLNK);
    }
    isFile() {
        return (this.mode & S_IFMT) === S_IFREG;
    }
    isDirectory() {
        return (this.mode & S_IFMT) === S_IFDIR;
    }
    isSymlink() {
        // return !!this.symlink;
        return (this.mode & S_IFMT) === S_IFLNK;
    }
    makeSymlink(steps) {
        this.symlink = steps;
        this.setIsSymlink();
    }
    write(buf, off = 0, len = buf.length, pos = 0) {
        if (!this.buf)
            this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        if (pos + len > this.buf.length) {
            const newBuf = (0, buffer_1.bufferAllocUnsafe)(pos + len);
            this.buf.copy(newBuf, 0, 0, this.buf.length);
            this.buf = newBuf;
        }
        buf.copy(this.buf, pos, off, off + len);
        this.touch();
        return len;
    }
    // Returns the number of bytes read.
    read(buf, off = 0, len = buf.byteLength, pos = 0) {
        if (!this.buf)
            this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        let actualLen = len;
        if (actualLen > buf.byteLength) {
            actualLen = buf.byteLength;
        }
        if (actualLen + pos > this.buf.length) {
            actualLen = this.buf.length - pos;
        }
        this.buf.copy(buf, off, pos, pos + actualLen);
        return actualLen;
    }
    truncate(len = 0) {
        if (!len)
            this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        else {
            if (!this.buf)
                this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
            if (len <= this.buf.length) {
                this.buf = this.buf.slice(0, len);
            }
            else {
                const buf = (0, buffer_1.bufferAllocUnsafe)(0);
                this.buf.copy(buf);
                buf.fill(0, len);
            }
        }
        this.touch();
    }
    chmod(perm) {
        this.perm = perm;
        this.mode = (this.mode & ~0o777) | perm;
        this.touch();
    }
    chown(uid, gid) {
        this.uid = uid;
        this.gid = gid;
        this.touch();
    }
    touch() {
        this.mtime = new Date();
        this.emit("change", this);
    }
    canRead(uid = getuid(), gid = getgid()) {
        if (this.perm & 4 /* S.IROTH */) {
            return true;
        }
        if (gid === this.gid) {
            if (this.perm & 32 /* S.IRGRP */) {
                return true;
            }
        }
        if (uid === this.uid) {
            if (this.perm & 256 /* S.IRUSR */) {
                return true;
            }
        }
        return false;
    }
    canWrite(uid = getuid(), gid = getgid()) {
        if (this.perm & 2 /* S.IWOTH */) {
            return true;
        }
        if (gid === this.gid) {
            if (this.perm & 16 /* S.IWGRP */) {
                return true;
            }
        }
        if (uid === this.uid) {
            if (this.perm & 128 /* S.IWUSR */) {
                return true;
            }
        }
        return false;
    }
    del() {
        this.emit("delete", this);
    }
    toJSON() {
        return {
            ino: this.ino,
            uid: this.uid,
            gid: this.gid,
            atime: this.atime.getTime(),
            mtime: this.mtime.getTime(),
            ctime: this.ctime.getTime(),
            perm: this.perm,
            mode: this.mode,
            nlink: this.nlink,
            symlink: this.symlink,
            data: this.getString(),
        };
    }
}
exports.Node = Node;
/**
 * Represents a hard link that points to an i-node `node`.
 */
class Link extends events_1.EventEmitter {
    constructor(vol, parent, name) {
        super();
        this.children = {};
        // Path to this node as Array: ['usr', 'bin', 'node'].
        this._steps = [];
        // "i-node" number of the node.
        this.ino = 0;
        // Number of children.
        this.length = 0;
        this.vol = vol;
        this.parent = parent;
        this.name = name;
        this.syncSteps();
    }
    get steps() {
        return this._steps;
    }
    // Recursively sync children steps, e.g. in case of dir rename
    set steps(val) {
        this._steps = val;
        for (const child of Object.values(this.children)) {
            child?.syncSteps();
        }
    }
    setNode(node) {
        this.node = node;
        this.ino = node.ino;
    }
    getNode() {
        return this.node;
    }
    createChild(name, node = this.vol.createNode()) {
        const link = new Link(this.vol, this, name);
        link.setNode(node);
        if (node.isDirectory()) {
            // link.setChild('.', link);
            // link.getNode().nlink++;
            // link.setChild('..', this);
            // this.getNode().nlink++;
        }
        this.setChild(name, link);
        return link;
    }
    childrenChanged() {
        // When a file or directory gets created, mtime and ctime should
        // get updated.  See https://github.com/sagemathinc/memfs-js/issues/4
        // atime isn't updated since access isn't happening (?).  I'm just
        // copying what happens on MacOS natively.
        this.node.mtime = this.node.ctime = new Date();
    }
    setChild(name, link = new Link(this.vol, this, name)) {
        this.children[name] = link;
        this.childrenChanged();
        link.parent = this;
        this.length++;
        this.emit("child:add", link, this);
        return link;
    }
    deleteChild(link) {
        delete this.children[link.getName()];
        this.childrenChanged();
        this.length--;
        this.emit("child:delete", link, this);
    }
    getChild(name) {
        if (Object.hasOwnProperty.call(this.children, name)) {
            return this.children[name];
        }
    }
    getPath() {
        return this.steps.join(exports.SEP);
    }
    getName() {
        return this.steps[this.steps.length - 1];
    }
    // del() {
    //     const parent = this.parent;
    //     if(parent) {
    //         parent.deleteChild(link);
    //     }
    //     this.parent = null;
    //     this.vol = null;
    // }
    /**
     * Walk the tree path and return the `Link` at that location, if any.
     * @param steps {string[]} Desired location.
     * @param stop {number} Max steps to go into.
     * @param i {number} Current step in the `steps` array.
     *
     * @return {Link|null}
     */
    walk(steps, stop = steps.length, i = 0) {
        if (i >= steps.length)
            return this;
        if (i >= stop)
            return this;
        const step = steps[i];
        const link = this.getChild(step);
        if (!link)
            return null;
        return link.walk(steps, stop, i + 1);
    }
    toJSON() {
        return {
            steps: this.steps,
            ino: this.ino,
            children: Object.keys(this.children),
        };
    }
    syncSteps() {
        this.steps = this.parent
            ? this.parent.steps.concat([this.name])
            : [this.name];
    }
}
exports.Link = Link;
/**
 * Represents an open file (file descriptor) that points to a `Link` (Hard-link) and a `Node`.
 */
class File {
    /**
     * Open a Link-Node pair. `node` is provided separately as that might be a different node
     * rather the one `link` points to, because it might be a symlink.
     * @param link
     * @param node
     * @param flags
     * @param fd
     */
    constructor(link, node, flags, fd) {
        /**
         * A cursor/offset position in a file, where data will be written on write.
         * User can "seek" this position.
         */
        this.position = 0;
        this.link = link;
        this.node = node;
        this.flags = flags;
        this.fd = fd;
    }
    getString(encoding = "utf8") {
        return this.node.getString();
    }
    setString(str) {
        this.node.setString(str);
    }
    getBuffer() {
        return this.node.getBuffer();
    }
    setBuffer(buf) {
        this.node.setBuffer(buf);
    }
    getSize() {
        return this.node.getSize();
    }
    truncate(len) {
        this.node.truncate(len);
    }
    seekTo(position) {
        this.position = position;
    }
    stats() {
        return Stats_1.default.build(this.node);
    }
    write(buf, offset = 0, length = buf.length, position) {
        if (typeof position !== "number")
            position = this.position;
        if (this.flags & O_APPEND)
            position = this.getSize();
        const bytes = this.node.write(buf, offset, length, position);
        this.position = position + bytes;
        return bytes;
    }
    read(buf, offset = 0, length = buf.byteLength, position) {
        if (typeof position !== "number")
            position = this.position;
        const bytes = this.node.read(buf, offset, length, position);
        this.position = position + bytes;
        return bytes;
    }
    chmod(perm) {
        this.node.chmod(perm);
    }
    chown(uid, gid) {
        this.node.chown(uid, gid);
    }
}
exports.File = File;
