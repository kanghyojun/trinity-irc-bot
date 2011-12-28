var fs = require('fs');

var irc = require('irc');

var config = (function() {
  var data = fs.readFileSync('./config.json');
  return JSON.parse(data);
})();

var bot = new irc.Client(config.server, config.nick, config.options);

bot.addListener('message', function(from, to, message) {
  if(/^trinity\:.*$/.test(message)) {
    this.say(to, 'yes sir');
  }
});
