"use strict";

const should = require('chai').should();
const path = require('path');
const Sandbox = require('../');
const good_module = path.join(__dirname, './good_module');
const bad_module = path.join(__dirname, './bad_module');


describe('Sandbox', function(){

  describe('#loadWidget', function() {
    it('should load good module without errors', function(done){

      let sandbox = new Sandbox({
        whitelist: ['http']
      });

      let sandboxed = sandbox.loadWidget(good_module);

      sandboxed.name.should.be.eql('Good module');
      done();
    });
  });

  describe('#loadWidget', function() {
    it('should fail to load good module because of blacklist', function(done){

      let sandbox = new Sandbox({
        blacklist: ['http']
      });

      try {
        let sandboxed = sandbox.loadWidget(good_module);

        done(new Error('Bad module was loaded'));
      } catch (error) {
        error.should.be.instanceOf(Error);
        done();
      }
    });
  });

  describe('#loadWidget', function() {
    it('should fail to load bad module', function(done){

      let sandbox = new Sandbox({
        whitelist: ['net']
      });

      try {
        let sandboxed = sandbox.loadWidget(bad_module);

        done(new Error('Bad module was loaded'));
      } catch (error) {
        error.should.be.instanceOf(Error);
        done();
      }
    });
  });

  describe('#loadWidget', function() {
    it('should load good module without errors. Whitelist supersedes blacklist', function(done){

      let sandbox = new Sandbox({
        whitelist: ['http'],
        blacklist: ['http']
      });

      let sandboxed = sandbox.loadWidget(good_module);

      sandboxed.name.should.be.eql('Good module');
      done();
    });
  });

});
