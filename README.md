# Ghost Sandbox

This module was extracted from the [Ghost blogging platform](https://github.com/TryGhost/Ghost) project. Its sole purpose is to create a sandboxed environment for Node.js modules.


### Installation
```
npm install ghost-sandbox
```


### Example 1: Using a whitelist

Using a `whitelist` will only allow the the sandboxed module to require the listed modules.

```
var Sandbox = require('ghost-sandbox'); 

var sandbox = new Sandbox({
  whitelist: ['when', 'lodash', ...]
});

var sandboxedModule = sandbox.loadWidget(modulePath);
```

### Example 2: Using a blacklist

Using a `blacklist` will only reject the listed modules.

```
var Sandbox = require('ghost-sandbox'); 

var sandbox = new Sandbox({
  blacklist: ['path', 'fs', ...]
});

var sandboxedModule = sandbox.loadWidget(modulePath);
```

**Note:** If you include both options, the `whitelist` will supersede the `blacklist`.


License
-------

(MIT License)