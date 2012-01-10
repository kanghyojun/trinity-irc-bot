var vows = require('vows'),
    assert = require('assert');

var db = require('./db');

vows.describe('db functions').addBatch({
  'Db initialize': {
    topic: function() {
      db.initialize('botTest', '127.0.0.1', 27017);
      return null;
    },
    'make db client': function() {
      assert.equal(db.name, 'botTest');
    }
  },
  'agenda methods': {
    'get agenda': function() {
      db.getAgenda(2, function(agenda) {
        assert.equal(agenda.content, 'hi');
      });
    },
    'set agenda': function() {
      db.setAgenda('hi', 'h!i!');
    },
  },
  
}).run();
