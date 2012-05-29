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
  'Key in Object': {
    topic: Crackle.key('foo').in({foo: 'bar', bar: 'foo'}),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  },
  'Value not in list': {
    topic: !Crackle.is(1).in(2, 3, 4, 5),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  },
  'Value in Array': {
    topic: Crackle.is(3).in([1, 2, 3, 4, 5]),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  },
  'All values satisfy predicate': {
    topic: Crackle.is(set).all(function(e) { return e >= 1; }),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  },
  'All values are typeof "number"': {
    topic: Crackle.is(set).typeof('number'),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  },
  'All values are instanceof Object': {
    topic: Crackle.is([{}, {}]).instanceof(Object),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  },
  'All values of Object[key] in Object Array satisfy predicate': {
    topic: Crackle.is([
      {firstname: 'John', lastname: 'Smith'},
      {firstname: 'Jane', lastname: 'Doe'}
    ]).key('firstname').all(function(name) {
      return name[0] === 'J';
    }),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  },
  'Key in each Object in Object Array': {
    topic: Crackle.is([
      {firstname: 'John', lastname: 'Smith'},
      {firstname: 'Jane', lastname: 'Doe'}
    ]).key('firstname').defined(),
    'true': function(topic) {
      assert.equal(topic, true);
    }
  }
}).export(module);