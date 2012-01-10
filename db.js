var mongodb = require('mongodb');


var model = {
  initialize: function(name, addr, port) {
    this.name = name;
    this.addr = addr;
    this.port = port;
  },
  connect: function(callback) {
    callback(new mongodb.Db(
      this.name, 
      new mongodb.Server(this.addr, this.port, {})
    ));
  },
  openAgenda: function(callback) {
    this.connect(function(connect) {
      connect.open(function(err, db) {
        db.collection('agenda', function(err, collection) {
          callback(db, collection);
        });
      });
    });
  },
  getLastNumber: function(callback) {
    this.openAgenda(function(db, collection){
      collection.find({}, {'sort': [['num', 'desc']]}, function(err, cursor) {
        cursor.toArray(function(err, agendas) {
          callback(agendas[0].num);
          db.close();
        });
      });
    });
  },
  getAgenda: function(n, callback) {
    this.openAgenda(function(db, collection) {
      collection.findOne({num:n}, function(err, agenda) {
          callback(agenda);
          db.close();
      });
    });
  },
  setAgenda: function(title, content) {
    this.openAgenda(function(db, collection) {
      model.getLastNumber(function(n) {
        collection.insert({num: n + 1, title: title, content: content});
        db.close();
      });
    });
  },
}

module.exports = model;
