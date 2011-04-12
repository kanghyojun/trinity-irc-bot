var fs = require('fs');
var irc = require('irc');
var trinity = require('./trinity');

fs.readFile('./config.json', function (err, data) {
  if (err) throw err;
  trinity(new irc.Client(null, null, JSON.parse(data)));
});

