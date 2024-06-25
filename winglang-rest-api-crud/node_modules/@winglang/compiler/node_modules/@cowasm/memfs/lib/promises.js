"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandle = void 0;
function promisify(vol, fn, getResult = (input) => input) {
    return (...args) => new Promise((resolve, reject) => {
        vol[fn].bind(vol)(...args, (error, result) => {
            if (error)
                return reject(error);
            return resolve(getResult(result));
        });
    });
}
class FileHandle {
    constructor(vol, fd) {
        this.vol = vol;
        this.fd = fd;
    }
    appendFile(data, options) {
        return promisify(this.vol, "appendFile")(this.fd, data, options);
    }
    chmod(mode) {
        return promisify(this.vol, "fchmod")(this.fd, mode);
    }
    chown(uid, gid) {
        return promisify(this.vol, "fchown")(this.fd, uid, gid);
    }
    close() {
        return promisify(this.vol, "close")(this.fd);
    }
    datasync() {
        return promisify(this.vol, "fdatasync")(this.fd);
    }
    read(buffer, offset, length, position) {
        return promisify(this.vol, "read", (bytesRead) => ({ bytesRead, buffer }))(this.fd, buffer, offset, length, position);
    }
    readFile(options) {
        return promisify(this.vol, "readFile")(this.fd, options);
    }
    stat(options) {
        return promisify(this.vol, "fstat")(this.fd, options);
    }
    sync() {
        return promisify(this.vol, "fsync")(this.fd);
    }
    truncate(len) {
        return promisify(this.vol, "ftruncate")(this.fd, len);
    }
    utimes(atime, mtime) {
        return promisify(this.vol, "futimes")(this.fd, atime, mtime);
    }
    write(buffer, offset, length, position) {
        return promisify(this.vol, "write", (bytesWritten) => ({
            bytesWritten,
            buffer,
        }))(this.fd, buffer, offset, length, position);
    }
    writeFile(data, options) {
        return promisify(this.vol, "writeFile")(this.fd, data, options);
    }
}
exports.FileHandle = FileHandle;
function createPromisesApi(vol) {
    if (typeof Promise === "undefined")
        return null;
    return {
        FileHandle,
        access(path, mode) {
            return promisify(vol, "access")(path, mode);
        },
        appendFile(path, data, options) {
            return promisify(vol, "appendFile")(path instanceof FileHandle ? path.fd : path, data, options);
        },
        chmod(path, mode) {
            return promisify(vol, "chmod")(path, mode);
        },
        chown(path, uid, gid) {
            return promisify(vol, "chown")(path, uid, gid);
        },
        copyFile(src, dest, flags) {
            return promisify(vol, "copyFile")(src, dest, flags);
        },
        lchmod(path, mode) {
            return promisify(vol, "lchmod")(path, mode);
        },
        lchown(path, uid, gid) {
            return promisify(vol, "lchown")(path, uid, gid);
        },
        link(existingPath, newPath) {
            return promisify(vol, "link")(existingPath, newPath);
        },
        lstat(path, options) {
            return promisify(vol, "lstat")(path, options);
        },
        mkdir(path, options) {
            return promisify(vol, "mkdir")(path, options);
        },
        mkdtemp(prefix, options) {
            return promisify(vol, "mkdtemp")(prefix, options);
        },
        open(path, flags, mode) {
            return promisify(vol, "open", (fd) => new FileHandle(vol, fd))(path, flags, mode);
        },
        readdir(path, options) {
            return promisify(vol, "readdir")(path, options);
        },
        readFile(id, options) {
            return promisify(vol, "readFile")(id instanceof FileHandle ? id.fd : id, options);
        },
        readlink(path, options) {
            return promisify(vol, "readlink")(path, options);
        },
        realpath(path, options) {
            return promisify(vol, "realpath")(path, options);
        },
        rename(oldPath, newPath) {
            return promisify(vol, "rename")(oldPath, newPath);
        },
        rmdir(path) {
            return promisify(vol, "rmdir")(path);
        },
        rm(path, options) {
            return promisify(vol, "rm")(path, options);
        },
        stat(path, options) {
            return promisify(vol, "stat")(path, options);
        },
        symlink(target, path, type) {
            return promisify(vol, "symlink")(target, path, type);
        },
        truncate(path, len) {
            return promisify(vol, "truncate")(path, len);
        },
        unlink(path) {
            return promisify(vol, "unlink")(path);
        },
        utimes(path, atime, mtime) {
            return promisify(vol, "utimes")(path, atime, mtime);
        },
        writeFile(id, data, options) {
            return promisify(vol, "writeFile")(id instanceof FileHandle ? id.fd : id, data, options);
        },
    };
}
exports.default = createPromisesApi;
