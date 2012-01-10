var fs = require('fs');

var irc = require('irc');

var env = require('./env'), 
    db = require('./db');

var read = fs.readFileSync('./config.json');
var config = JSON.parse(read.toString());


var bot = new irc.Client(config.server, config.nick, config.options);

db.initialize('bot', '127.0.0.1', 27017);

bot.addListener('message', function(from, to, message) {
  if(/^trinity\:.*$/.test(message)) { 
    var token = message.split(" ");
    if(env.command.indexOf(token[1]) != -1 ) {
      if(token[1] == 'help') {
        this.say(to, '도움 메세지');
        this.say(to, 'help    -  이 메세지를 볼수 있습니다.');
        this.say(to, 'get     -  아젠다 내용, 리스트 등을 가지고옵니다');
        this.say(to, 'set     -  아젠다, 투표 등을 등록합니다');
      } else if(token[1] == 'script') {
        this.say(to, this.script(token));
      } else if(token[1] == 'set') {
        if(token[2] == 'agenda') {
          var content = '';
          for(i = 4; i <= token.length; i++) {
            content += " " + token[i];
          }
          db.setAgenda(token[3], content);
          db.getLastNumber(function(num) {
            bot.say(to, (num + 1).toString() + '번 agenda로 등록됨');
          });
        }
      } else if(token[1] == 'get') {
        if(token[2] == 'agenda') {
          db.getAgenda(parseInt(token[3]), function(agenda) {
            bot.say(to, '# ' + agenda.title + ' --- [' + agenda.num + ']');
            bot.say(to, '---------------');
            bot.say(to, agenda.content);
          });
        }
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
