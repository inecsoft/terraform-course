"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenciesCache = void 0;
const TreeNodeId_1 = require("./TreeNodeId");
/**
 * A cache for the dependencies of a package.
 *
 * ## Depth Considerations
 *
 * Since the enumerated dependency tree can be limited by a max depth argument,
 * several considerations have to be made when caching.
 *
 *   - If a package is visited with a requested depth greater than the cached
 *     depth, the cache cannot be used. The tree needs to be enumerated again
 *     deeper.
 *   - If a package is visited with a requested depth less than the cached
 *     depth, the cache probably can't be used. This depends on how strict the
 *     depth constraint is and whether it's acceptable to exceed the max depth.
 *     This cache assumes the max depth should not be exceeded.
 *   - Cycles may or may not be cached. It depends on whether the cycle is
 *     introduced by a package outside of the cached tree.
 *
 * This cache adds an optimization when a dependency tree has been fully
 * enumerated and wasn't limited by a max depth argument. In that case,
 * dependency trees cached can be used when the max depth argument is greater
 * than or equal to the height of the tree root.
 *
 * ## Future Optimizations
 *
 * The necessity of this cache may be removed in the future with a refactor of
 * the `pnpm list` command. This cache attempts to optimize runtime to O(# of
 * unique packages), but the list command is O(# of nodes) anyway since every
 * node needs to be printed. It's possible a generator function could be
 * returned here to avoid computing large trees in-memory before passing to
 * downstream commands.
 */
class DependenciesCache {
    constructor() {
        this.fullyVisitedCache = new Map();
        /**
         *  Maps cacheKey -> visitedDepth -> dependencies
         */
        this.partiallyVisitedCache = new Map();
    }
    get(args) {
        const cacheKey = (0, TreeNodeId_1.serializeTreeNodeId)(args.parentId);
        // The fully visited cache is only usable if the height doesn't exceed the
        // requested depth. Otherwise the final dependencies listing will print
        // entries with a greater depth than requested.
        //
        // If that is the case, the partially visited cache should be checked to see
        // if dependencies were requested at that exact depth before.
        const fullyVisitedEntry = this.fullyVisitedCache.get(cacheKey);
        if (fullyVisitedEntry !== undefined && fullyVisitedEntry.height <= args.requestedDepth) {
            return {
                dependencies: fullyVisitedEntry.dependencies,
                height: fullyVisitedEntry.height,
                circular: false,
            };
        }
        const partiallyVisitedEntry = this.partiallyVisitedCache.get(cacheKey)?.get(args.requestedDepth);
        if (partiallyVisitedEntry != null) {
            return {
                dependencies: partiallyVisitedEntry,
                height: 'unknown',
                circular: false,
            };
        }
        return undefined;
    }
    addFullyVisitedResult(treeNodeId, result) {
        const cacheKey = (0, TreeNodeId_1.serializeTreeNodeId)(treeNodeId);
        this.fullyVisitedCache.set(cacheKey, result);
    }
    addPartiallyVisitedResult(treeNodeId, result) {
        const cacheKey = (0, TreeNodeId_1.serializeTreeNodeId)(treeNodeId);
        const dependenciesByDepth = this.partiallyVisitedCache.get(cacheKey) ?? new Map();
        if (!this.partiallyVisitedCache.has(cacheKey)) {
            this.partiallyVisitedCache.set(cacheKey, dependenciesByDepth);
        }
        dependenciesByDepth.set(result.depth, result.dependencies);
    }
}
exports.DependenciesCache = DependenciesCache;
//# sourceMappingURL=DependenciesCache.js.map