var fs = require('fs');

var irc = require('irc');
t 
var config = (function() {
  var data = fs.readFileSync('./config.json');
  return JSON.parse(data);
})();

var bot = new irc.Client(config.server, config.nick, config.options);
