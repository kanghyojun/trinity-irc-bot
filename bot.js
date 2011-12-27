var fs = require('fs'),
    irc = require('irc'),

fs.readFile('./config.json', function (err, data) {
  var config = JSON.parse(data);
});

