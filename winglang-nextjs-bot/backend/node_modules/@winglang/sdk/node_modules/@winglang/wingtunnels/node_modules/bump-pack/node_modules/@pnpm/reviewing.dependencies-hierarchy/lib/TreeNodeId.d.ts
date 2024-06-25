export type TreeNodeId = TreeNodeIdImporter | TreeNodeIdPackage;
/**
 * A project local to the pnpm workspace.
 */
interface TreeNodeIdImporter {
    readonly type: 'importer';
    readonly importerId: string;
}
/**
 * An npm package depended on externally.
 */
interface TreeNodeIdPackage {
    readonly type: 'package';
    readonly depPath: string;
}
export declare function serializeTreeNodeId(treeNodeId: TreeNodeId): string;
export {};
