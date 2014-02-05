/* jshint undef: true*/
/* global it, describe */

define([
  'mocha',
  'chai',
  'dev/scripts/util/StringUtil',
  'dev/scripts/prefixer'
], function(
  mocha,
  chai,
  StringUtil,
  Prefixer
) {
  

  var assert = chai.assert,
      expect = chai.expect,
      should = chai.should;
  
  function run() {
    console.log('Running tests');

    StringUtilTests();
    prefixTests();

    mocha.run();
  }


  function StringUtilTests() {
    // Format
    describe('StringUtil.format', function() {
      it('should format a string, replacing {n} with n:th passed in argument', function() {
        assert(StringUtil.format("hello") === "hello");
        assert(StringUtil.format("{0}", "hello") === "hello");
        assert(StringUtil.format("When{0} you g{1}", "ever", "o") === "Whenever you go");
        assert(StringUtil.format("when{0}, for{0}", "ever") === "whenever, forever");
      });
    });
  }


  function prefixTests() {
    Prefixer.prefixAll();

    // rAF
    describe("window.requestAnimationFrame", function() {
      it('should be unprefixed and a working function', function() {
        assert(window.requestAnimationFrame);
      });
    });
  }


  return {
    run: run
  };
});