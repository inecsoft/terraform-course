import { type PackageNode } from './PackageNode';
import { type TreeNodeId } from './TreeNodeId';
export interface GetDependenciesCacheEntryArgs {
    readonly parentId: TreeNodeId;
    readonly requestedDepth: number;
}
export interface TraversalResultFullyVisited {
    readonly dependencies: PackageNode[];
    /**
     * Describes the height of the parent node in the fully enumerated dependency
     * tree. A height of 0 means no entries are present in the dependencies array.
     * A height of 1 means entries in the dependencies array do not have any of
     * their own dependencies.
     */
    readonly height: number;
}
export interface TraversalResultPartiallyVisited {
    readonly dependencies: PackageNode[];
    /**
     * Describes how deep the dependencies tree was previously traversed. Since
     * the traversal result was limited by a max depth, there are likely more
     * dependencies present deeper in the tree not shown.
     *
     * A depth of 0 would indicate no entries in the dependencies array. A depth
     * of 1 means entries in the dependencies array do not have any of their own
     * dependencies.
     */
    readonly depth: number;
}
export interface CacheHit {
    readonly dependencies: PackageNode[];
    readonly height: number | 'unknown';
    readonly circular: false;
}
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
export declare class DependenciesCache {
    private readonly fullyVisitedCache;
    /**
     *  Maps cacheKey -> visitedDepth -> dependencies
     */
    private readonly partiallyVisitedCache;
    get(args: GetDependenciesCacheEntryArgs): CacheHit | undefined;
    addFullyVisitedResult(treeNodeId: TreeNodeId, result: TraversalResultFullyVisited): void;
    addPartiallyVisitedResult(treeNodeId: TreeNodeId, result: TraversalResultPartiallyVisited): void;
}
