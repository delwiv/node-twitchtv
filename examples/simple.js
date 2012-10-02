var TwitchClient = require("../node-twitchtv")
  , account = require("../secrets/me.json");
  
  
  
var client = new TwitchClient(account);

client.games({}, function(err, games) {
  console.log(games);
});