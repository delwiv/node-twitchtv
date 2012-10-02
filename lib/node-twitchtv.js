var request = require("request");

var twitch_url = "https://api.twitch.tv/kraken";

var TwitchClient = function() {
  
};


TwitchClient.prototype.auth = function authenticate() {
  var url = "https://api.twitch.tv/kraken/oauth2/token";
  
  request({
    url: "https://api.twitch.tv/kraken/oauth2/token",
    body: {
      client_id: "",
      username: "",
      password: "",
      scope: ""
    }
  }, function() {
    console.log(arguments);
  })
};



/*
 *  var client = new TwitchClient({}).authenticate();
 
 client.streams(function(err, response) {
   
 });
 
 */


module.exports = TwitchClient;