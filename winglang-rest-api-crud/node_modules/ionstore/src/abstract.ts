
/* IMPORT */

import {attempt} from './utils';
import type {Options} from './types';

/* MAIN */

class AbstractStore extends Map<string, string> {

  /* VARIABLES */

  #save: () => void;

  /* CONSTRUCTOR */

  constructor ( options: Options ) {

    super ();

    const {id, backend} = options;

    if ( !/^[a-zA-Z0-9_-]+$/.test ( id ) ) throw new Error ( `Invalid store id: "${id}"` );

    const read = () => attempt ( () => backend.read ( id ), [] );
    const write = () => attempt ( () => backend.write ( id, this.entries () ), null );

    for ( const [key, value] of read () ) {

      super.set ( key, value );

    }

    this.#save = write;

    return this;

  }

  /* API */

  clear (): void {

    if ( !this.size ) return;

    super.clear ();

    this.#save ();

  }

  delete ( key: string ): boolean {

    const deleted = super.delete ( key );

    if ( !deleted ) return false;

    this.#save ();

    return true;

  }

  set ( key: string, value: string ): this {

    const valuePrev = this.get ( key );

    if ( value === valuePrev ) return this;

    super.set ( key, value );

    this.#save ();

    return this;

  }

}

/* EXPORT */

export default AbstractStore;
