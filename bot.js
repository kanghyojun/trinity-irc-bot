var fs = require('fs');

var irc = require('irc');

var env = require('./env');

var config = JSON.parse(fs.readFileSync('./config.json'));

var bot = new irc.Client(config.server, config.nick, config.options);

bot.addListener('message', function(from, to, message) {
  if(/^trinity\:.*$/.test(message)) { 
    var token = message.split(" ");
    if(env.command.indexOf(token[1]) != -1 ) {
      if(token[1] == 'script') {
        this.say(to, this.script(token));
      }

    } else {
      this.say(to, '니가 뭔소리하는지 모르겠당께.');
    }
  }
});

bot.script = function(token) {

  token.shift();
  token.shift();

  var script = token.join(" "),
      result = null;

  try {
    result = eval(script);
  } catch(err) {
    result = "Error occured ::> " + err;
  }

  return result;
}
