
var should = require('chai').should();
var path = require('path');
var Sandbox = require('../');
var Root = path.resolve(__dirname, '../');
var testDir = path.resolve(Root, 'test');
var good_module = path.join(testDir, './good_module');
var bad_module = path.join(testDir, './bad_module');


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

});