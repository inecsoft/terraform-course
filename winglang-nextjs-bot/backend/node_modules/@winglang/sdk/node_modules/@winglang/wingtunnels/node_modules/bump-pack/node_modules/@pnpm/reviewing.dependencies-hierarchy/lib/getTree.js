"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTree = void 0;
const path_1 = __importDefault(require("path"));
const getPkgInfo_1 = require("./getPkgInfo");
const getTreeNodeChildId_1 = require("./getTreeNodeChildId");
const DependenciesCache_1 = require("./DependenciesCache");
const TreeNodeId_1 = require("./TreeNodeId");
function getTree(opts, parentId) {
    const dependenciesCache = new DependenciesCache_1.DependenciesCache();
    return getTreeHelper(dependenciesCache, opts, Keypath.initialize(parentId), parentId).dependencies;
}
exports.getTree = getTree;
function getTreeHelper(dependenciesCache, opts, keypath, parentId) {
    if (opts.maxDepth <= 0) {
        return { dependencies: [], height: 'unknown' };
    }
    function getSnapshot(treeNodeId) {
        switch (treeNodeId.type) {
            case 'importer':
                return opts.importers[treeNodeId.importerId];
            case 'package':
                return opts.currentPackages[treeNodeId.depPath];
        }
    }
    const snapshot = getSnapshot(parentId);
    if (!snapshot) {
        return { dependencies: [], height: 0 };
    }
    const deps = !opts.includeOptionalDependencies
        ? snapshot.dependencies
        : {
            ...snapshot.dependencies,
            ...snapshot.optionalDependencies,
        };
    if (deps == null) {
        return { dependencies: [], height: 0 };
    }
    const childTreeMaxDepth = opts.maxDepth - 1;
    const getChildrenTree = getTreeHelper.bind(null, dependenciesCache, {
        ...opts,
        maxDepth: childTreeMaxDepth,
    });
    function getPeerDependencies() {
        switch (parentId.type) {
            case 'importer':
                // Projects in the pnpm workspace can declare peer dependencies, but pnpm
                // doesn't record this block to the importers lockfile object. Returning
                // undefined for now.
                return undefined;
            case 'package':
                return opts.currentPackages[parentId.depPath]?.peerDependencies;
        }
    }
    const peers = new Set(Object.keys(getPeerDependencies() ?? {}));
    // If the "ref" of any dependency is a file system path (e.g. link:../), the
    // base directory of this relative path depends on whether the dependent
    // package is in the pnpm workspace or from node_modules.
    function getLinkedPathBaseDir() {
        switch (parentId.type) {
            case 'importer':
                return path_1.default.join(opts.lockfileDir, parentId.importerId);
            case 'package':
                return opts.lockfileDir;
        }
    }
    const linkedPathBaseDir = getLinkedPathBaseDir();
    const resultDependencies = [];
    let resultHeight = 0;
    let resultCircular = false;
    Object.entries(deps).forEach(([alias, ref]) => {
        const packageInfo = (0, getPkgInfo_1.getPkgInfo)({
            alias,
            currentPackages: opts.currentPackages,
            rewriteLinkVersionDir: opts.rewriteLinkVersionDir,
            linkedPathBaseDir,
            peers,
            ref,
            registries: opts.registries,
            skipped: opts.skipped,
            wantedPackages: opts.wantedPackages,
            virtualStoreDir: opts.virtualStoreDir,
        });
        let circular;
        const matchedSearched = opts.search?.(packageInfo);
        let newEntry = null;
        const nodeId = (0, getTreeNodeChildId_1.getTreeNodeChildId)({
            parentId,
            dep: { alias, ref },
            lockfileDir: opts.lockfileDir,
            importers: opts.importers,
        });
        if (opts.onlyProjects && nodeId?.type !== 'importer') {
            return;
        }
        else if (nodeId == null) {
            circular = false;
            if (opts.search == null || matchedSearched) {
                newEntry = packageInfo;
            }
        }
        else {
            let dependencies;
            circular = keypath.includes(nodeId);
            if (circular) {
                dependencies = [];
            }
            else {
                const cacheEntry = dependenciesCache.get({ parentId: nodeId, requestedDepth: childTreeMaxDepth });
                const children = cacheEntry ?? getChildrenTree(keypath.concat(nodeId), nodeId);
                if (cacheEntry == null && !children.circular) {
                    if (children.height === 'unknown') {
                        dependenciesCache.addPartiallyVisitedResult(nodeId, {
                            dependencies: children.dependencies,
                            depth: childTreeMaxDepth,
                        });
                    }
                    else {
                        dependenciesCache.addFullyVisitedResult(nodeId, {
                            dependencies: children.dependencies,
                            height: children.height,
                        });
                    }
                }
                const heightOfCurrentDepNode = children.height === 'unknown'
                    ? 'unknown'
                    : children.height + 1;
                dependencies = children.dependencies;
                resultHeight = resultHeight === 'unknown' || heightOfCurrentDepNode === 'unknown'
                    ? 'unknown'
                    : Math.max(resultHeight, heightOfCurrentDepNode);
                resultCircular = resultCircular || (children.circular ?? false);
            }
            if (dependencies.length > 0) {
                newEntry = {
                    ...packageInfo,
                    dependencies,
                };
            }
            else if ((opts.search == null) || matchedSearched) {
                newEntry = packageInfo;
            }
        }
        if (newEntry != null) {
            if (circular) {
                newEntry.circular = true;
                resultCircular = true;
            }
            if (matchedSearched) {
                newEntry.searched = true;
            }
            resultDependencies.push(newEntry);
        }
    });
    const result = {
        dependencies: resultDependencies,
        height: resultHeight,
    };
    if (resultCircular) {
        result.circular = resultCircular;
    }
    return result;
}
/**
 * Useful for detecting cycles.
 */
class Keypath {
    constructor(keypath) {
        this.keypath = keypath;
    }
    static initialize(treeNodeId) {
        return new Keypath([(0, TreeNodeId_1.serializeTreeNodeId)(treeNodeId)]);
    }
    includes(treeNodeId) {
        return this.keypath.includes((0, TreeNodeId_1.serializeTreeNodeId)(treeNodeId));
    }
    concat(treeNodeId) {
        return new Keypath([...this.keypath, (0, TreeNodeId_1.serializeTreeNodeId)(treeNodeId)]);
    }
}
//# sourceMappingURL=getTree.js.map