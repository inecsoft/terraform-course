# IonStore

A _very_ simple isomorphic key-value store with a Map-like API for persisting session data.

This module simply uses a temporary file under Node, and `sessionStorage` under a browser. Check out [`isostore`](https://github.com/fabiospampinato/isostore) if you need something a bit more sophisticated.

## Install

```sh
npm install --save ionstore
```

## Usage

```ts
import IonStore from 'ionstore';

// Creating a store, for temporary persistence

const store = new IonStore ( 'my-store' ); // The id of the store decides the name of the file on disk

store.has ( 'foo' ); // => false
store.set ( 'foo', 'some_string' ); // => store
store.get ( 'foo' ); // => 'some_string'
store.delete ( 'foo' ); // => true
```

## License

MIT © Fabio Spampinato
