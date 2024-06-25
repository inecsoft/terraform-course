"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTreeNodeId = void 0;
function serializeTreeNodeId(treeNodeId) {
    switch (treeNodeId.type) {
        case 'importer': {
            // Only serialize known fields from TreeNodeId. TypeScript is duck typed and
            // objects can have any number of unknown extra fields.
            const { type, importerId } = treeNodeId;
            return JSON.stringify({ type, importerId });
        }
        case 'package': {
            const { type, depPath } = treeNodeId;
            return JSON.stringify({ type, depPath });
        }
    }
}
exports.serializeTreeNodeId = serializeTreeNodeId;
//# sourceMappingURL=TreeNodeId.js.map