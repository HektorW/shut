/* jshint undef: true*/

define([
  'mocha',
  'chai',
  'dev/scripts/util/StringUtil'
], function(
  mocha,
  chai,
  StringUtil
) {
  

  var assert = chai.assert,
      expect = chai.expect,
      should = chai.should;
  
  function run() {
    console.log('Running tests');

    StringUtilTests();

    mocha.run();
  }


  function StringUtilTests() {
    describe('StringUtil.format', function() {
      it('should format a string, replacing {n} with n:th passed in argument', function() {
        assert(StringUtil.format("hello") === "hello");
      });
    });
  }



  return {
    run: run
  };
});