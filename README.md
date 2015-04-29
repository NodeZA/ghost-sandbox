# Ghost Sandbox

This module was extracted from the [Ghost blogging platform](https://github.com/TryGhost/Ghost) project. Its sole purpose is to create a sandboxed environment for Node.js modules.


### Installation
```
npm install ghost-sandbox
```


### Example

```
var Sandbox = require('ghost-sandbox');

var sandbox = new Sandbox({
  whitelist: ['when', 'lodash', ...]
});

var sandboxedModule = sandbox.loadWidget({String}relativePath);
```


License
-------

(MIT License)