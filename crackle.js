/**
 * Crackle
 * JavaScript predicate, comparator, equality, and utility functions
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
          if (Array.prototype.slice.call(arguments).length === 1) {
            return self.filter(function(e) {
              return (that.indexOf(e) < 0);
            });
          } else {
            var that = Array.prototype.slice.call(arguments);
            return self.filter(function(e) {
              return (that.indexOf(e) < 0);
            });
          }
        }
      };
    },
    /**
     * Assertions and contracts
     */
    is: function(self) {
      return {
        /**
         * Return {Boolean} that an element exists in an Array
         * @param self {Object}
         * @param collection {Array}
         */
        in: function(collection) {
          if (Array.prototype.slice.call(arguments).length === 1) {
            return collection.some(function(e) {
              return (self === e);
            });
          } else {
            return Array.prototype.slice.call(arguments).some(function(e) {
              return (self === e);
            });
          }
        },
        /**
         * Return {Boolean} that a predicate is satisfied
         * for each element in an Array
         * @param self {Array}
         * @param predicate {Function}
         */
        all: function(predicate) {
          for (var i = 0; i < self.length; i++) {
            if (!predicate(self[i])) {
              return false;
            }
          } return true;
        },
        /**
         * Return {Boolean} that a type is satisfied
         * for each element in an Array
         * @param self {Array}
         * @param type {String}
         */
        typeof: function(type) {
          if (Array.isArray(self)) {
            for (var i = 0; i < self.length; i++) {
              if (typeof self[i] !== type) {
                return false;
              }
            } return true;
          } else {
            return (typeof self === type);
          }
        },
        /**
         * Return {Boolean} that each element in an Array
         * is an instanceof of a type
         * @param self {Array}
         * @param type {Constructor}
         */
        instanceof: function(type) {
          if (Array.isArray(self)) {
            for (var i = 0; i < self.length; i++) {
              if (!(self[i] instanceof type)) {
                return false;
              }
            } return true;
          } else {
            return (self instanceof type);
          }
        }
      };
    }
  };

  if ($ !== null) {
    /**
     * Return jQuery objects from HTML string(s)
     * @param self {String Array} or {String}
     */
    Crackle.parse = function(self) {
      if (Array.isArray(self)) {
        return self.map(function(html) {
          return $(html);
        });
      } else {
        return $(self);
      }
    };
    /**
     * Return HTML strings from jQuery object(s)
     * @param self {jQuery Object Array} or {jQuery Object}
     */
    Crackle.stringify = function(self) {
      if (typeof self === 'string') {
        return self;
      } else if (Array.isArray(self)) {
        return self.map(function(object) {
          return object.outerHTML;
        });
      } else {
        return self.outerHTML;
      }
    };
    /**
     * Fuzzy similarity comparator
     */
    Crackle.similar = function(self) {
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
    };
  }

  if (typeof window !== 'undefined') {
    window.Crackle = Crackle;
  } else {
    exports = module.exports = Crackle;
  }

})(
  (function() {
    return (typeof jQuery !== 'undefined') ? jQuery : null;
  })()
);
