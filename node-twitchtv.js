var request = require("request");

var twitch_url = "https://api.twitch.tv/kraken";

var TwitchClient = function(config) {

    this.username = config.username;
    this.password = config.password;
    this.client_id = config.client_id;
    this.scope = config.scope;
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



TwitchClient.prototype.games = function retrieveGames(params, callback) {
  var self = this;
  request({
    url: twitch_url + "/games/top",
    query: params
  }, function(err, request, response) {
    response = JSON.parse(response);
    var games = response.top;
    if (callback) callback.call(self, null, games, response);
  });
};

/*
 *  var client = new TwitchClient({}).authenticate();

 client.streams(function(err, response) {
   
 });

 */


module.exports = TwitchClient;
