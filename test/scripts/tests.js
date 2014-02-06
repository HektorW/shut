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
  

  var assert = chai.assert;
  
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
        assert.equal(StringUtil.format("hello"), "hello");
        assert.equal(StringUtil.format("{0}", "hello"), "hello");
        assert.equal(StringUtil.format("When{0} you g{1}", "ever", "o"), "Whenever you go");
        assert.equal(StringUtil.format("when{0}, for{0}", "ever"), "whenever, forever");

        assert.equal(StringUtil.format("when{0}, for{0}"), "when{0}, for{0}");

        assert.notEqual(StringUtil.format("{0}", 'walla'), "{0}");
      });
    });
  }


  function prefixTests() {
    Prefixer.prefixAll();

    // prefixAll
    describe("prefixer.prefixAll", function() {
      it('should have masked prefixed functions', function() {
        assert(window.requestAnimationFrame, 'requestAnimationFrame is prefixed');
        assert(window.cancelAnimationFrame);
        assert(window.performance.now);
        assert(window.performance.now());
      });
    });

    // prefixedCss
    describe('prefix.prefixedCss', function() {
      it('should prefix passed in property with vendors', function() {

        assert(Prefixer.prefixedCss('transform', 'translateZ(0)') == (
          '-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0);'
        ));

      });
    });
  }


  return {
    run: run
  };
});