import { type ProjectSnapshot } from '@pnpm/lockfile-file';
import { type TreeNodeId } from './TreeNodeId';
export interface getTreeNodeChildIdOpts {
    readonly parentId: TreeNodeId;
    readonly dep: {
        readonly alias: string;
        readonly ref: string;
    };
    readonly lockfileDir: string;
    readonly importers: Record<string, ProjectSnapshot>;
}
export declare function getTreeNodeChildId(opts: getTreeNodeChildIdOpts): TreeNodeId | undefined;
