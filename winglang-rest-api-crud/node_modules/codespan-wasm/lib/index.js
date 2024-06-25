"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitDiagnostic = exports.CHARS_ASCII = exports.CHARS_BOX_DRAWING = void 0;
const codespan_bindings = require("../pkg");
exports.CHARS_BOX_DRAWING = {
    snippetStart: "┌─",
    sourceBorderLeft: '│',
    sourceBorderLeftBreak: '·',
    noteBullet: '=',
    singlePrimaryCaret: '^',
    singleSecondaryCaret: '-',
    multiPrimaryCaretStart: '^',
    multiPrimaryCaretEnd: '^',
    multiSecondaryCaretStart: '\'',
    multiSecondaryCaretEnd: '\'',
    multiTopLeft: '╭',
    multiTop: '─',
    multiBottomLeft: '╰',
    multiBottom: '─',
    multiLeft: '│',
    pointerLeft: '│',
};
exports.CHARS_ASCII = {
    snippetStart: "-->",
    sourceBorderLeft: '|',
    sourceBorderLeftBreak: '.',
    noteBullet: '=',
    singlePrimaryCaret: '^',
    singleSecondaryCaret: '-',
    multiPrimaryCaretStart: '^',
    multiPrimaryCaretEnd: '^',
    multiSecondaryCaretStart: '\'',
    multiSecondaryCaretEnd: '\'',
    multiTopLeft: '/',
    multiTop: '-',
    multiBottomLeft: '\\',
    multiBottom: '-',
    multiLeft: '|',
    pointerLeft: '|',
};
/**
 * Emit a diagnostic using the given files, context, and config.
 */
function emitDiagnostic(files, diagnostic, config, coloring) {
    return codespan_bindings.emit_diagnostic(files, diagnostic, config, coloring);
}
exports.emitDiagnostic = emitDiagnostic;
