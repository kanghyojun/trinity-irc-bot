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
      this.say(to, '?');
      this.say(to, '너 지금 내가 javascript로 만들어졌다고 무시하냐? 씨풋');
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
