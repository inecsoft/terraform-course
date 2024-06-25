
/* IMPORT */

import colors, {ENABLED} from '../dist/index.js';

/* MAIN */

console.log ( ENABLED );
console.log ( '' );
console.log ( colors.black ( 'black' ) );
console.log ( colors.red ( 'red' ) );
console.log ( colors.green ( 'green' ) );
console.log ( colors.yellow ( 'yellow' ) );
console.log ( colors.blue ( 'blue' ) );
console.log ( colors.magenta ( 'magenta' ) );
console.log ( colors.cyan ( 'cyan' ) );
console.log ( colors.white ( 'white' ) );
console.log ( colors.gray ( 'gray' ) );
console.log ( '' );
console.log ( colors.bgBlack ( 'bgBlack' ) );
console.log ( colors.bgRed ( 'bgRed' ) );
console.log ( colors.bgGreen ( 'bgGreen' ) );
console.log ( colors.bgYellow ( 'bgYellow' ) );
console.log ( colors.bgBlue ( 'bgBlue' ) );
console.log ( colors.bgMagenta ( 'bgMagenta' ) );
console.log ( colors.bgCyan ( 'bgCyan' ) );
console.log ( colors.bgWhite ( 'bgWhite' ) );
console.log ( colors.bgGray ( 'bgGray' ) );
console.log ( '' );
console.log ( colors.reset ( 'reset' ) );
console.log ( colors.bold ( 'bold' ) );
console.log ( colors.dim ( 'dim' ) );
console.log ( colors.italic ( 'italic' ) );
console.log ( colors.underline ( 'underline' ) );
console.log ( colors.overline ( 'overline' ) );
console.log ( colors.inverse ( 'inverse' ) );
console.log ( colors.hidden ( 'hidden' ) );
console.log ( colors.strikethrough ( 'strikethrough' ) );
console.log ( '' );
console.log ( colors.black.bgWhite ( 'black.bgWhite' ) );
console.log ( colors.red.bgBlue ( 'red.bgBlue' ) );
console.log ( colors.green.bgYellow ( 'green.bgYellow' ) );
console.log ( colors.underline.italic.bold ( 'underline.italic.bold' ) );
console.log ( colors.underline.italic.bold.reset ( 'underline.italic.bold.reset' ) );
console.log ( colors.reset.underline.italic.bold ( 'reset.underline.italic.bold' ) );
