module.exports = function(bot) {

  callPatt = /^[trinity:|!]/;

  function tokenize(text){
    return text.split(" ");
  }

  bot.eval = function(from, to, token) {
    if(token[0] == "script") {
      token.shift()
      this.script(to, token.join(" "));
    }
  }

  bot.script = function(to, source) {
    var result = null;
    try {
      result = eval(source);
    } catch(err) {
      result = "Error Occured ::> " + err;
    }
    this.say(to, result);
  }

  bot.addListener( "message", function( from, to, message ) {
    if(callPatt.exec(message)) {
      token = tokenize(message.replace(callPatt, ''));
      bot.eval(from, to, token);
    }
  });
}
