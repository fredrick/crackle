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
  "use strict";
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 0) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    }
  }
  var Crackle = {
    /**
     * Return elements of `self` not in `that`
     * @param self {Array}
     * @param that {Array}
     */
    not: function(self) {
      return {
        in: function(that) {
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
     * Key verifier
     */
    key: function(key) {
      return {
        in: function(self) {
          for (var property in self) {
            if (key === property) {
              return true;
            }
          } return false;
        }
      };
    },
    /**
     * Collection verifiers
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
        },
        key: function(property) {
          return {
            /**
             * Return {Boolean} that a predicate is satisfied 
             * for each Object[property] in an Array
             * @param self {Array}
             * @param property {String}
             * @param predicate {Function}
             */
            all: function(predicate) {
              for (var i = 0; i < self.length; i++) {
                if (!predicate(self[i][property])) {
                  return false;
                }
              } return true;
            },
            /**
             * Return {Boolean} if property exists for each Object in an Array
             * @param self {Array}
             * @param property {String}
             */
            defined: function() {
              for (var i = 0; i < self.length; i++) {
                if (!Crackle.key(property).in(self[i])) {
                  return false;
                }
              } return true;
            }
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
