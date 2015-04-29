
var should = require('chai').should();
var path = require('path');
var Sandbox = require('../');
var good_module = path.join(__dirname, './good_module');
var bad_module = path.join(__dirname, './bad_module');


describe('Sandbox', function(){

  describe('#loadWidget', function() {
    it('should load good module without errors', function(done){

      var sandbox = new Sandbox({
        whitelist: ['lodash']
      });

      var sandboxed = sandbox.loadWidget(good_module);

      sandboxed.name.should.be.eql('Good module');
      done();
    });
  });

  describe('#loadWidget', function() {
    it('should fail to load good module because of blacklist', function(done){
      
      var sandbox = new Sandbox({
        blacklist: ['lodash']
      });

      try {
        var sandboxed = sandbox.loadWidget(good_module);

        done(new Error('Bad module was loaded'));
      } catch (error) {
        error.should.be.instanceOf(Error);
        done();
      }
    });
  });

  describe('#loadWidget', function() {
    it('should fail to load bad module', function(done){
      
      var sandbox = new Sandbox({
        whitelist: ['lodash']
      });

      try {
        var sandboxed = sandbox.loadWidget(bad_module);

        done(new Error('Bad module was loaded'));
      } catch (error) {
        error.should.be.instanceOf(Error);
        done();
      }
    });
  });

  describe('#loadWidget', function() {
    it('should load good module without errors. Whitelist supersedes blacklist', function(done){

      var sandbox = new Sandbox({
        whitelist: ['lodash'],
        blacklist: ['lodash']
      });

      var sandboxed = sandbox.loadWidget(good_module);

      sandboxed.name.should.be.eql('Good module');
      done();
    });
  });

});