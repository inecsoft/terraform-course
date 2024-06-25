import { type PackageSnapshots, type ProjectSnapshot } from '@pnpm/lockfile-file';
import { type Registries } from '@pnpm/types';
import { type SearchFunction } from './types';
import { type PackageNode } from './PackageNode';
import { type TreeNodeId } from './TreeNodeId';
interface GetTreeOpts {
    maxDepth: number;
    rewriteLinkVersionDir: string;
    includeOptionalDependencies: boolean;
    lockfileDir: string;
    onlyProjects?: boolean;
    search?: SearchFunction;
    skipped: Set<string>;
    registries: Registries;
    importers: Record<string, ProjectSnapshot>;
    currentPackages: PackageSnapshots;
    wantedPackages: PackageSnapshots;
    virtualStoreDir?: string;
}
export declare function getTree(opts: GetTreeOpts, parentId: TreeNodeId): PackageNode[];
export {};
