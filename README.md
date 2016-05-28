# Ghost Sandbox

This module was extracted from the [Ghost blogging platform](https://github.com/TryGhost/Ghost) project. Its sole purpose is to create a sandboxed environment for Node.js modules.


### Installation
```
npm install ghost-sandbox
```


### Example 1: Using a whitelist

Using a `whitelist` will only allow the the sandboxed module to require the listed modules.

```javascript
"use strict";

const Sandbox = require('ghost-sandbox');

const sandbox = new Sandbox({
  whitelist: ['when', 'lodash', ...]
});

const sandboxedModule = sandbox.loadWidget(modulePath);
```

### Example 2: Using a blacklist

Using a `blacklist` will only reject the listed modules.

```javascript
"use strict";

const Sandbox = require('ghost-sandbox');

const sandbox = new Sandbox({
  blacklist: ['path', 'fs', ...]
});

const sandboxedModule = sandbox.loadWidget(modulePath);
```

**Note:** If you include both options, the `whitelist` will supersede the `blacklist`.


License
-------

(MIT License)
