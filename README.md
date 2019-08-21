# data-capsule [![Build Status](https://travis-ci.org/wix/data-capsule.svg?branch=master)](https://travis-ci.org/wix/data-capsule)

A plugable capsule for storing key/value data for your application.

Following plugins support is built in:
 1. LocalStorage - works with browser's native local storage, plugin automatically manages expiration and auto-cleans to never exceed quota.
 2. WixStorage - wix internal implementation (**can be used only by wix applications, use as reference if you want to implement something similar**) of storage plugin that communicates with wix server to store the data.
 2. CachedStorage - works with two plugins, will use one of them for persistent storage and the second for local cache in order to do less requests to more expensive persistent storage. this can be used for example with WixStorage as persistent storage on remote servers combined with LocalStorage for local cache.
 3. FrameStorage - a nice way to offload storage request from frame to parent window. parent window can use LocalStorage, CachedStorage or any other plugin you can think of. this is extremely helpful for working around [3rd party site data issues](http://www.howtogeek.com/241006/how-to-block-third-party-cookies-in-every-web-browser/).

## installation

```sh
$ npm install --save data-capsule
```

### bower support (not recommended)

```sh
$ bower install --save data-capsule
```

```html
<script src="bower_components/data-capsule/index.bundle.js"></script>
```

```js
const {DataCapsule, LocalStorageStrategy} = DataCapsuleTools;
```

## DataCapsule

DataCapsule is the one responsible for your needs. When you create a capsule you must provide a `strategy` (see below) for *how* data will be saved. In addition, you can optionally provide a `namespace` and `scope` for your capsule. If you didn't provide `namespace` in constructor, you must do so for each operation you do on the capsule. However, `scope` is optional. The idea is that `namespace` distinguishes your data from other applications who are using the same strategy (for example in case of localstorage, other applications that run in the same origin), and `scope` distinguishes your data from data the same application might write when in different context (for example, user id is often used as `scope`). Even if you provided `namespace` and `scope` in constructor, you may override it for specific operation by passing different `namespace` or `scope` when passing `options` to one of the capsule's methods.

In addition, you can pass in an optional expiration which will be passed on to the different strategies.

```js
constructor(options) {
  // options: {
  //   strategy: Any class which implements BaseStorage (see below)
  //   namespace: String (optional)
  //   scope: String (optional)
  //   expiration: Number (optional)
  // }
}
```

After instantiating a `DataCapsule` with your chosen strategy (see some strategies below), you can start using the capsule. The capsule provides only four methods:
 1. `setItem(key, value, options): Promise<void>` - Just pass a `key` (string) and `value` (any serializable type) and it will be saved. As described above, the `options` object may contain `namespace` and `scope` if you didn't do so in constructur or would like to override the values you passed in constructor. Only in `setItems`, you can also pass `expiration` (in seconds) in `options`. If you didn't pass `expiration`, the storage strategy you provided may decide on a default `expiration`. The returned promise indicates if operation was successful.
 2. `getItem(key, options): Promise<value>` - Just pass a `key` (string) and returned promise will get resolved with the `value` that you previously saved. The `options` object may contain `namespace` and `scope` if you didn't do so in constructur or would like to override the values you passed in constructor. In case no such key exists in storage, promise will get rejected with exception NOT_FOUND (you can `import {NOT_FOUND} from 'data-capsule` and test if `err === NOT_FOUND` if you want to distinguish this case from other errors).
 3. `removeItem(key, options): Promise<void>` - Just pass a `key` (string). The `options` object may contain `namespace` and `scope` if you didn't do so in constructur or would like to override the values you passed in constructor. The returned promise indicates if operation was successful.
 4. `getAllItems(options): Promise<key/value>` - Returned promise will get resolved with a key/value map containing all keys that are stored in this `namespace`/`scope` and their values. Keys lookup will be done according to the `namespace` and `scope` you passed in constructor and in `options`. As usual: If you didn't provide `namespace` in constructor, you must do so for each operation you do on the capsule. However, `scope` is optional.

## LocalStorage

No parameters needed in LocalStorage constructor. Note the LocalStorageCapsule short form below.

```js
import {DataCapsule, LocalStorageStrategy} from 'data-capsule';

const capsule = new DataCapsule({
  strategy: new LocalStorageStrategy(),
  namespace: '${your-app-namespace}'
});
await capsule.setItem('shahata', 123);
console.log(await capsule.getItem('shahata')); // logs 123
```

And shorter alternative:

```js
import {LocalStorageCapsule} from 'data-capsule';

const capsule = LocalStorageCapsule({namespace: '${your-app-namespace}'});
await capsule.setItem('shahata', 123);
console.log(await capsule.getItem('shahata')); // logs 123
```

## CachedStorage

Constructor accepts `options` object with `remoteStrategy` and `localStrategy`. Get operations are first tried against `localStrategy` and if no local cache exists, we then fallback to `remoteStrategy` and eventually cache to `localStrategy`. Set operations are cached to `localStrategy` as well. Note that `localStrategy` cache is always set with expiration period of one hour in order to avoid stale cache issues. However, if you wish, you can override the expiration period by passing in the expiration option. (pass `null` to completely remove the expiration). The `localStrategy` is `new LocalStorageStrategy()` by default, so you don't have to pass it, but anyway you are better off using the short form below:

```js
import {DataCapsule, CachedStorageStrategy, LocalStorageStrategy, WixStorageStrategy} from 'data-capsule';

const capsule = new DataCapsule({
  strategy: new CachedStorageStrategy({
    remoteStrategy: new WixStorageStrategy(),
    localStrategy: new LocalStorageStrategy()
  }),
  namespace: '${your-app-namespace}'
});
await capsule.setItem('shahata', 123); //send setItem request to server
console.log(await capsule.getItem('shahata')); // logs 123
// ^ does not send getItem request to server since value is cached
```

And shorter alternative:

```js
import {LocalStorageCachedCapsule, WixStorageStrategy} from 'data-capsule';

const capsule = LocalStorageCachedCapsule({
  remoteStrategy: new WixStorageStrategy(),
  namespace: '${your-app-namespace}'
});
await capsule.setItem('shahata', 123); //send setItem request to server
console.log(await capsule.getItem('shahata')); // logs 123
// ^ does not send getItem request to server since value is cached
```

Site scoped example **(can be used only by wix applications)**:

```js
import {LocalStorageCachedCapsule, WixStorageStrategy} from 'data-capsule';

const capsule = LocalStorageCachedCapsule({
  remoteStrategy: new WixStorageStrategy(),
  scope: '${meta-site-id}',
  namespace: '${your-app-namespace}'
});
await capsule.setItem('shahata', 123); //send setItem request to server
console.log(await capsule.getItem('shahata')); // logs 123
// ^ does not send getItem request to server since value is cached
```

## InMemoryStorage

A simple in memory storage. Could be useful also as a testing strategy.

```js
import {DataCapsule, InMemoryStorageStrategy} from 'data-capsule';

const capsule = new DataCapsule({
  strategy: new InMemoryStorageStrategy(),
  namespace: '${your-app-namespace}'
});
await capsule.setItem('shahata', 123);
console.log(await capsule.getItem('shahata')); // logs 123
```

And shorter alternative:

```js
import {InMemoryStorageCapsule} from 'data-capsule';

const capsule = InMemoryStorageCapsule({namespace: '${your-app-namespace}'});
await capsule.setItem('shahata', 123);
console.log(await capsule.getItem('shahata')); // logs 123
```


## FrameStorage

This allows frame windows to send commands via `messageChannel` while host window eventually invokes command on actual storage strategy. In host window, all you have to do is create a `FrameStorageListener` and `start` it and finally `stop` it if and when you are done. Note:
 1. `FrameStorageListener(storageStrategy?)` optionally gets a storage strategy as argument. By default, this is `new LocalStorageStrategy()`, but you can decide to override this default with any other strategy.

 2. `FrameStorageListener.start(verifier, interceptor?)` receives Two callbacks as arguements which invoked for each valid message host window gets.
    1. verifier ```(source, origin, token) => <boolean\>```
      * The callback needs to return a boolean that will indicate whether this `source` (the window who sent the message), `origin` ([read more](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#The_dispatched_event)), and `token` (an optional token passed to `FrameStorageStrategy` below) can be trusted. If callback returns `false`, message is not verified.
    2. interceptor ```(options, source, origin, token) => modifiedOptionsObject```
      * The interceptor is running after the verifier, and can change the options of each request. We'll need it to manage the storage from the host perspective, change the scope or the namespace.

```js
import {FrameStorageListener} from 'data-capsule';

const listener = new FrameStorageListener();

// verifier will not authorize the task if the origin is different than below.
const verifier = (source, origin, token) => {
  if (origin !== 'http://example.org:8080') {
    return false;
  }

  return true;
}

// interceptor will override the namespace and the scope.
const interceptor = (options, source, origin, token) => {
  options.namespace = 'new-namespace';
  options.scope = 'new-scope';
  return options;
}

listener.start(verifier, interceptor);
listener.stop();
```

```js
import {FrameStorageListener} from 'data-capsule';

const listener = new FrameStorageListener();
listener.start((source, origin, token) => token === 'secret');
//...
listener.stop();
```

In frame window you create a `DataCapsule` with a `FrameStorageStrategy` strategy. Note `FrameStorageStrategy` constructor requires the following arguments:
 1. `target` - The window which runs the listener that will work with the real storage on our behalf. Typically this will be `window.top` since the whole idea of this strategy is to use 1st party data storage instead of problematic 3rd party.
 2. `origin` - The origin that `target` window must be in for the events to be dispatched. This value can be `'*'` but this is **widely unrecommended** since it is dangerous and opens your application for malicious attacks.
 3. `token` - This token is later passed to the `start` callback in order to help verify that the messages from this frame can be trusted. What this token represents, how it gets verified in callback and how it is initially passed to frame is up to you.
 4. `opts` - supported options are connectionMaxTimeout (default is 2000ms should be extended in case you get max timeout of 2000ms exceeded) and messageMaxTimeout (default is 8000).

```js
import {DataCapsule, FrameStorageStrategy} from 'data-capsule';

const capsule = new DataCapsule({
  strategy: new FrameStorageStrategy(window.top, '*', 'secret'),
  namespace: '${your-app-namespace}'
});
await capsule.setItem('shahata', 123);
console.log(await capsule.getItem('shahata')); // logs 123
```

## BaseStorage

Following you can see the interface for BaseStorage. The DataCapsule and all storage strategies implement this interface and defer only in constructor.

Don't forget that you can also implement your own storage strategy! All you need to do is implement something similar to the example below and then you can pass it as strategy to DataCapsule.

```js
import {BaseStorage} from 'data-capsule';

class MyStorageStrategy extends BaseStorage {
  setItem(key, value, options) {
    // key: String (mandatory)
    // value: Any serializable type (mandatory)
    // options: {
    //   namespace: String (mandatory)
    //   scope: String (optional)
    //   expiration: Number of seconds (optional)
    //   ...: Any additional custom options are passed to you
    // }
    // returns a promise that resolves on success and rejects on failure
    return Promise.resolve();
  }

  getItem(key, options) {
    // key: String (mandatory)
    // options: {
    //   namespace: String (mandatory)
    //   scope: String (optional)
    //   ...: Any additional custom options are passed to you
    // }
    // returns a promise that resolves on success and rejects on failure
    // promise resolves with value which is assigned to key in this namespace/scope
    return Promise.resolve(123);
  }

  removeItem(key, options) {
    // key: String (mandatory)
    // options: {
    //   namespace: String (mandatory)
    //   scope: String (optional)
    //   ...: Any additional custom options are passed to you
    // }
    // returns a promise that resolves on success and rejects on failure
    return Promise.resolve();
  }

  getAllItems(options) {
    // options: {
    //   namespace: String (mandatory)
    //   scope: String (optional)
    //   ...: Any additional custom options are passed to you
    // }
    // returns a promise that resolves on success and rejects on failure
    // promise resolves with key/value map of all keys in this namespace/scope
    return Promise.resolve({key1: 123, key2: 456});
  }
}
```
