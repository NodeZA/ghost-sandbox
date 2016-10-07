"use strict";

const path = require('path');
const Module = require('module');


function WidgetSandbox(opts) {
  this.opts = opts || {};
}



WidgetSandbox.prototype.loadWidget = function (widgetPath) {
  let widgetFile = require.resolve(widgetPath);

  this.opts.widgetRoot = path.dirname(widgetFile);

  return this.loadModule(widgetPath);
};


WidgetSandbox.prototype.loadModule = function (widgetPath) {
  // Set loaded modules parent to this

  let parentModulePath = this.opts.parent || module.parent;
  let widgetRoot = this.opts.widgetRoot;
  let currentModule;
  let nodeRequire;

  // Resolve the modules path
  widgetPath = Module._resolveFilename(widgetPath, parentModulePath);

  // Instantiate a Node Module class
  currentModule = new Module(widgetPath, parentModulePath);

  // Grab the original modules require function
  nodeRequire = currentModule.require;

  // Set a new proxy require function
  currentModule.require = (module) => {

    // check whitelist (supersedes blacklist)
    if (this.opts.whitelist) {
      if(this.opts.whitelist.indexOf(module)) {
        throw new Error("Unsafe App require: " + module);
      }
    }

    // check blacklist
    else if (this.opts.blacklist && this.opts.blacklist.indexOf(module) > -1) {
      throw new Error("Unsafe App require: " + module);
    }

    let firstTwo = module.slice(0, 2);
    let resolvedPath;
    let relPath;
    let innerBox;
    let newOpts;

    // Load relative modules with their own sandbox
    if (firstTwo === './' || firstTwo === '..') {

      // Get the path relative to the modules directory
      resolvedPath = path.resolve(widgetRoot, module);

      // Check relative path from the widgetRoot for outside requires
      relPath = path.relative(widgetRoot, resolvedPath);

      if (relPath.slice(0, 2) === '..') {
        throw new Error('Unsafe App require: ' + relPath);
      }

      // Assign as new module path
      module = resolvedPath;

      // Pass down the same options
      newOpts = this.opts || {};

      // Make sure the widgetRoot and parent are appropriate
      newOpts.widgetRoot = widgetRoot;
      newOpts.parent = currentModule.parent;

      // Create the inner sandbox for loading this module.
      innerBox = new WidgetSandbox(newOpts);

      return innerBox.loadModule(module);
    }

    // Call the original require method for white listed named modules
    return nodeRequire.call(currentModule, module);
  };

  currentModule.load(currentModule.id);

  return currentModule.exports;
};

module.exports = WidgetSandbox;
