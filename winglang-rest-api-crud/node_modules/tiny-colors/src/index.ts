
/* IMPORT */

import {ENABLED} from './constants';
import type {ChainedModifier, Color, Modifier, Modifiers} from './types';

/* HELPERS */

const chain = ( modifier: Modifier ) => {
  return new Proxy ( modifier, {
    get ( target, prop ) {
      if ( prop in colors ) {
        return chain ( string => modifier ( colors[prop]( string ) ) );
      } else {
        return target[prop];
      }
    }
  });
};

const wrap = ( start: number, end: number ): ChainedModifier => {
  return chain (( string: string ): string => {
    if ( !ENABLED ) return string;
    return `\u001B[${start}m${string}\u001B[${end}m`;
  });
};

/* MAIN */

const colors: Modifiers = {
  /* MODIFIERS */
  reset: wrap ( 0, 0 ),
  bold: wrap ( 1, 22 ),
  dim: wrap ( 2, 22 ),
  italic: wrap ( 3, 23 ),
  underline: wrap ( 4, 24 ),
  overline: wrap ( 53, 55 ),
  inverse: wrap ( 7, 27 ),
  hidden: wrap ( 8, 28 ),
  strikethrough: wrap ( 9, 29 ),
  /* FOREGOUND */
  black: wrap ( 30, 39 ),
  red: wrap ( 31, 39 ),
  green: wrap ( 32, 39 ),
  yellow: wrap ( 33, 39 ),
  blue: wrap ( 34, 39 ),
  magenta: wrap ( 35, 39 ),
  cyan: wrap ( 36, 39 ),
  white: wrap ( 37, 39 ),
  gray: wrap ( 90, 39 ),
  /* BACKGROUND */
  bgBlack: wrap ( 40, 49 ),
  bgRed: wrap ( 41, 49 ),
  bgGreen: wrap ( 42, 49 ),
  bgYellow: wrap ( 43, 49 ),
  bgBlue: wrap ( 44, 49 ),
  bgMagenta: wrap ( 45, 49 ),
  bgCyan: wrap ( 46, 49 ),
  bgWhite: wrap ( 47, 49 ),
  bgGray: wrap ( 100, 49 )
};

/* EXPORT */

export default colors;
export {ENABLED};
export type {Color};
