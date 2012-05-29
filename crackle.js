/**
 * Crackle
 * jQuery comparator, equality, and JavaScript utility functions
 * git@github.com:wayoutmind/crackle.git
 */

// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name crackle.min.js
// ==/ClosureCompiler==

(function($) {
  var Crackle = {
    /**
     * Return elements of `self` not in `that`
     * @param self {Array}
     * @param that {Array}
     */
    difference: function(self) {
      return {
        from: function(that) {
          return self.filter(function(e) {
            return (that.indexOf(e) < 0);
          });
        }
      };
    },
    /**
     * Return jQuery objects from HTML string(s)
     * @param self {String Array} or {String}
     */
    parse: function(self) {
      if (Array.isArray(self)) {
        return self.map(function(html) {
          return $(html);
        });
      } else {
        return $(self);
      }
    },
    /**
     * Return HTML strings from jQuery object(s)
     * @param self {jQuery Object Array} or {jQuery Object}
     */
    stringify: function(self) {
      if (typeof self === 'string') {
        return self;
      } else if (Array.isArray(self)) {
        return self.map(function(object) {
          return object.outerHTML;
        });
      } else {
        return self.outerHTML;
      }
    },
    /**
     * Fuzzy similarity comparator
     */
    compare: function(self) {
      return {
        to: function(that) {
          if (Crackle.stringify(self) === Crackle.stringify(that)) {
            return true;
          } else if ($(self).attr('id') === $(that).attr('id')) {
            return true;
          } else {
            return false;
          }
        }
      };
    }
  };

  window.Crackle = Crackle;

})(jQuery);
