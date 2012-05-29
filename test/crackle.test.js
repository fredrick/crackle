var vows = require('vows'),
    assert = require('assert');

var Crackle = require('../crackle');

var set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

vows.describe('Crackle').addBatch({
  'List difference': {
    topic: Crackle.difference(set).from(2, 3, 4, 5),
    '[ 1, 6, 7, 8, 9, 10 ]': function(topic) {
      assert.deepEqual(topic, [1, 6, 7, 8, 9, 10]);
    }
  },
  'Array difference': {
    topic: Crackle.difference(set).from([2, 3, 4, 5]),
    '[ 1, 6, 7, 8, 9, 10 ]': function(topic) {
      assert.deepEqual(topic, [1, 6, 7, 8, 9, 10]);
    }
  },
  'Element not in list': {
    topic: !Crackle.is(1).in(2, 3, 4, 5),
    'true': function(topic) {
      assert.deepEqual(topic, true);
    }
  },
  'Element in array': {
    topic: Crackle.is(3).in([1, 2, 3, 4, 5]),
    'true': function(topic) {
      assert.deepEqual(topic, true);
    }
  },
  'All elements satisfy predicate': {
    topic: Crackle.is(set).all(function(e) { return e >= 1; }),
    'true': function(topic) {
      assert.deepEqual(topic, true);
    }
  },
  'All elements are typeof "number"': {
    topic: Crackle.is(set).typeof('number'),
    'true': function(topic) {
      assert.deepEqual(topic, true);
    }
  },
  'All elements are instanceof Object': {
    topic: Crackle.is([{}, {}]).instanceof(Object),
    'true': function(topic) {
      assert.deepEqual(topic, true);
    }
  }
}).export(module);