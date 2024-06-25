/**
 * The display style to use when rendering diagnostics.
 */
export type DisplayStyle = "rich" | "medium" | "short";
/**
 * The set of available colors for the terminal foreground/background.
 */
export type Color = "black" | "blue" | "green" | "red" | "cyan" | "magenta" | "yellow" | "white";
/**
 * A color specification.
 */
export interface ColorSpec {
    /**
     * The foreground color.
     */
    readonly fgColor?: Color;
    /**
     * The background color.
     */
    readonly bgColor?: Color;
    /**
     * Whether the text is bolded or not.
     */
    readonly bold: boolean;
    /**
     * Whether the text is intense or not.
     */
    readonly intense: boolean;
    /**
     * Whether the text is underlined or not.
     */
    readonly underline: boolean;
    /**
     * Whether the text is dimmed or not.
     */
    readonly dimmed: boolean;
    /**
     * Whether the text is italic or not.
     */
    readonly italic: boolean;
    /**
     * Whether reset is enabled or not.
     */
    readonly reset: boolean;
}
/**
 * Styles to use when rendering the diagnostic.
 */
export interface Styles {
    /**
     * The style to use when rendering bug headers. Defaults to fg:red bold
     * intense.
     */
    readonly headerBug?: ColorSpec;
    /**
     * The style to use when rendering error headers. Defaults to fg:red bold
     * intense.
     */
    readonly headerError?: ColorSpec;
    /**
     * The style to use when rendering warning headers. Defaults to fg:yellow bold
     * intense.
     */
    readonly headerWarning?: ColorSpec;
    /**
     * The style to use when rendering note headers. Defaults to fg:green bold
     * intense.
     */
    readonly headerNote?: ColorSpec;
    /**
     * The style to use when rendering help headers. Defaults to fg:cyan bold
     * intense.
     */
    readonly headerHelp?: ColorSpec;
    /**
     * The style to use when the main diagnostic message. Defaults to bold
     * intense.
     */
    readonly headerMessage?: ColorSpec;
    /**
     * The style to use when rendering bug labels. Defaults to fg:red.
     */
    readonly primaryLabelBug?: ColorSpec;
    /**
     * The style to use when rendering error labels. Defaults to fg:red.
     */
    readonly primaryLabelError?: ColorSpec;
    /**
     * The style to use when rendering warning labels. Defaults to fg:yellow.
     */
    readonly primaryLabelWarning?: ColorSpec;
    /**
     * The style to use when rendering note labels. Defaults to fg:green.
     */
    readonly primaryLabelNote?: ColorSpec;
    /**
     * The style to use when rendering bug headers. Defaults to fg:red bold
     * intense.
     */
    readonly primaryLabelHelp?: ColorSpec;
    /**
     * The style to use when rendering secondary labels. Defaults fg:blue (or
     * fg:cyan on windows).
     */
    readonly secondaryLabel?: ColorSpec;
    /**
     * The style to use when rendering the line numbers. Defaults fg:blue (or
     * fg:cyan on windows).
     */
    readonly lineNumber?: ColorSpec;
    /**
     * The style to use when rendering the source code borders. Defaults fg:blue
     * (or fg:cyan on windows).
     */
    readonly sourceBorder?: ColorSpec;
    /**
     * The style to use when rendering the note bullets. Defaults fg:blue (or
     * fg:cyan on windows).
     */
    readonly noteBullet?: ColorSpec;
}
/**
 * Characters to use when rendering the diagnostic.
 *
 * Use the `CHARS_BOX_DRAWING` constant to get the default characters, or
 * `CHARS_ASCII` constant for an ASCII-only format suitable for rendering on
 * terminals that do not support box drawing characters
 */
export interface Chars {
    /**
     * The characters to use for the top-left border of the snippet.
     */
    readonly snippetStart?: string;
    /**
     * The character to use for the left border of the source.
     */
    readonly sourceBorderLeft?: string;
    /**
     * The character to use for the left border break of the source.
     */
    readonly sourceBorderLeftBreak?: string;
    /**
     * The character to use for the note bullet.
     */
    readonly noteBullet?: string;
    /**
     * The character to use for marking a single-line primary label.
     */
    readonly singlePrimaryCaret?: string;
    /**
     * The character to use for marking a single-line secondary label.
     */
    readonly singleSecondaryCaret?: string;
    /**
     * The character to use for marking the start of a multi-line primary label.
     */
    readonly multiPrimaryCaretStart?: string;
    /**
     * The character to use for marking the end of a multi-line primary label.
     */
    readonly multiPrimaryCaretEnd?: string;
    /**
     * The character to use for marking the start of a multi-line secondary label.
     */
    readonly multiSecondaryCaretStart?: string;
    /**
     * The character to use for marking the end of a multi-line secondary label.
     */
    readonly multiSecondaryCaretEnd?: string;
    /**
     * The character to use for the top-left corner of a multi-line label.
     */
    readonly multiTopLeft?: string;
    /**
     * The character to use for the top of a multi-line label.
     */
    readonly multiTop?: string;
    /**
     * The character to use for the bottom-left corner of a multi-line label.
     */
    readonly multiBottomLeft?: string;
    /**
     * The character to use when marking the bottom of a multi-line label.
     */
    readonly multiBottom?: string;
    /**
     * The character to use for the left of a multi-line label.
     */
    readonly multiLeft?: string;
    /**
     * The character to use for the left of a pointer underneath a caret.
     */
    readonly pointerLeft?: string;
}
export declare const CHARS_BOX_DRAWING: Chars;
export declare const CHARS_ASCII: Chars;
/**
 * Configures how a diagnostic is rendered.
 */
export interface Config {
    /**
     * The display style to use when rendering diagnostics. Defaults to "rich".
     */
    readonly displayStyle?: DisplayStyle;
    /**
     * Column width of tabs. Defaults to: 4.
     */
    readonly tabWidth?: number;
    /**
     * Styles to use when rendering the diagnostic.
     */
    readonly styles?: Styles;
    /**
     * Characters to use when rendering the diagnostic.
     */
    readonly chars?: Chars;
    /**
     * The minimum number of lines to be shown after the line on which a multiline
     * label begins. Defaults to: 3.
     */
    readonly startContextLines?: number;
    /**
     * The minimum number of lines to be shown before the line on which a
     * multiline Label ends. Defaults to: 1.
     */
    readonly endContextLines?: number;
}
/**
 * A severity level for diagnostic messages.
 */
export type Severity = "bug" | "error" | "warning" | "note" | "help";
/**
 * The style of the label.
 *
 * Primary labels are used to describe the primary cause of a diagnostic.
 * Secondary labels are used to provide additional context for a diagnostic.
 */
export type LabelStyle = "primary" | "secondary";
/**
 * A label describing an underlined region of code associated with a diagnostic.
 */
export interface Label {
    /**
     * The style of the label.
     */
    readonly style: LabelStyle;
    /**
     * The file that we are labelling.
     */
    readonly fileId: string;
    /**
     * The start of the range in bytes we are going to include in the final
     * snippet.
     */
    readonly rangeStart: number;
    /**
     * The end of the range in bytes we are going to include in the final snippet.
     */
    readonly rangeEnd: number;
    /**
     * An optional message to provide some additional information for the
     * underlined code. These should not include line breaks.
     */
    readonly message: string;
}
/**
 * Represents a diagnostic message that can provide information like errors and
 * warnings to the user.
 *
 * The position of a Diagnostic is considered to be the position of the Label
 * that has the earliest starting position and has the highest style which
 * appears in all the labels of the diagnostic.
 */
export interface Diagnostic {
    /**
     * The overall severity of the diagnostic.
     */
    readonly severity: Severity;
    /**
     * An optional code that identifies this diagnostic.
     */
    readonly code?: string;
    /**
     * The main message associated with this diagnostic.
     *
     * These should not include line breaks, and in order support the ‘short’
     * diagnostic display mod, the message should be specific enough to make sense
     * on its own, without additional context provided by labels and notes.
     */
    readonly message: string;
    /**
     * Source labels that describe the cause of the diagnostic. The order of the
     * labels inside the vector does not have any meaning. The labels are always
     * arranged in the order they appear in the source code.
     */
    readonly labels?: Label[];
    /**
     * Notes that are associated with the primary cause of the diagnostic. These
     * can include line breaks for improved formatting.
     */
    readonly notes?: string[];
}
/**
 * A file referenced by a diagnostic.
 */
export interface File {
    /**
     * The name of the file. This is the same as the fileId used to identify the
     * file in the diagnostic.
     */
    readonly name: string;
    /**
     * The source code of the file.
     */
    readonly source: string;
}
/**
 * Emit a diagnostic using the given files, context, and config.
 */
export declare function emitDiagnostic(files: File[], diagnostic: Diagnostic, config: Config, coloring: boolean): string;
