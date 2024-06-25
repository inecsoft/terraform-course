
/* IMPORT */

import AbstractStore from './abstract';

/* MAIN */

class BrowserStore extends AbstractStore {

  /* CONSTRUCTOR */

  constructor ( id: string ) {

    super ({
      id,
      backend: {
        read: id => {
          return JSON.parse ( sessionStorage.getItem ( id ) || '[]' );
        },
        write: ( id, data ) => {
          return sessionStorage.setItem ( id, JSON.stringify ( Array.from ( data ) ) );
        }
      }
    });

  }

}

/* EXPORT */

export default BrowserStore;
