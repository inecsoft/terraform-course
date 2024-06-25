"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPkgInfo = void 0;
const path_1 = __importDefault(require("path"));
const lockfile_utils_1 = require("@pnpm/lockfile-utils");
const dependency_path_1 = require("@pnpm/dependency-path");
const normalize_path_1 = __importDefault(require("normalize-path"));
function getPkgInfo(opts) {
    let name;
    let version;
    let resolved;
    let dev;
    let optional;
    let isSkipped = false;
    let isMissing = false;
    const depPath = (0, dependency_path_1.refToRelative)(opts.ref, opts.alias);
    if (depPath) {
        let pkgSnapshot;
        if (opts.currentPackages[depPath]) {
            pkgSnapshot = opts.currentPackages[depPath];
            const parsed = (0, lockfile_utils_1.nameVerFromPkgSnapshot)(depPath, pkgSnapshot);
            name = parsed.name;
            version = parsed.version;
        }
        else {
            pkgSnapshot = opts.wantedPackages[depPath];
            if (pkgSnapshot) {
                const parsed = (0, lockfile_utils_1.nameVerFromPkgSnapshot)(depPath, pkgSnapshot);
                name = parsed.name;
                version = parsed.version;
            }
            else {
                name = opts.alias;
                version = opts.ref;
            }
            isMissing = true;
            isSkipped = opts.skipped.has(depPath);
        }
        resolved = (0, lockfile_utils_1.pkgSnapshotToResolution)(depPath, pkgSnapshot, opts.registries).tarball;
        dev = pkgSnapshot.dev;
        optional = pkgSnapshot.optional;
    }
    else {
        name = opts.alias;
        version = opts.ref;
    }
    if (!version) {
        version = opts.ref;
    }
    const fullPackagePath = depPath
        ? path_1.default.join(opts.virtualStoreDir ?? '.pnpm', (0, dependency_path_1.depPathToFilename)(depPath), 'node_modules', name)
        : path_1.default.join(opts.linkedPathBaseDir, opts.ref.slice(5));
    if (version.startsWith('link:') && opts.rewriteLinkVersionDir) {
        version = `link:${(0, normalize_path_1.default)(path_1.default.relative(opts.rewriteLinkVersionDir, fullPackagePath))}`;
    }
    const packageInfo = {
        alias: opts.alias,
        isMissing,
        isPeer: Boolean(opts.peers?.has(opts.alias)),
        isSkipped,
        name,
        path: fullPackagePath,
        version,
    };
    if (resolved) {
        packageInfo.resolved = resolved;
    }
    if (optional === true) {
        packageInfo.optional = true;
    }
    if (typeof dev === 'boolean') {
        packageInfo.dev = dev;
    }
    return packageInfo;
}
exports.getPkgInfo = getPkgInfo;
//# sourceMappingURL=getPkgInfo.js.map