
/* IMPORT */

import {describe} from 'fava';
import Store from '../dist/node.js';

/* MAIN */

//TODO: Ensure the browser backend is fully tested also

describe ( 'IonStore', it => {

  it ( 'works', t => {

    // Instantiation

    const id = `ionstore-${Math.random ().toString ( 36 ).slice ( 2 )}`;
    const store = new Store ( id );

    t.true ( store instanceof Map );
    t.is ( store.size, 0 );

    // Get

    t.is ( store.has ( 'foo' ), false );
    t.is ( store.get ( 'foo' ), undefined );

    // Set

    store.set ( 'foo', 'foo_value' );
    store.set ( 'bar', 'bar_value' );

    t.is ( store.size, 2 );
    t.is ( store.has ( 'foo' ), true );
    t.is ( store.get ( 'foo' ), 'foo_value' );

    // Keys

    t.deepEqual ( Array.from ( store.keys () ), ['foo', 'bar'] );

    // Values

    t.deepEqual ( Array.from ( store.values () ), ['foo_value', 'bar_value'] );

    // Delete

    store.delete ( 'foo' );

    t.is ( store.size, 1 );
    t.is ( store.has ( 'foo' ), false );
    t.is ( store.get ( 'foo' ), undefined );

    // Clear

    store.clear ();

    t.is ( store.size, 0 );
    t.is ( store.has ( 'bar' ), false );
    t.is ( store.get ( 'bar' ), undefined );

    // Invalid name

    try {

      new Store ( '👍' );

      t.fail ();

    } catch {

      t.pass ();

    }

  });

});
