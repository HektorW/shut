/* jshint undef: true*/
/* global describe:true, it:true */

define([
  'mocha',
  'chai',
  'dev/scripts/util/StringUtil'
], function(
  Mocha,
  Chai,
  StringUtil
) {
  
  console.log(Mocha);

  var assert = Chai.assert;
  
  function run() {
    console.log('Running tests');

    // StringUtilTests();
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