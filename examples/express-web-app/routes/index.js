var TwitchClient = require("node-twitchtv");

var client = new TwitchClient();

/*
 * GET home page.
 */

exports.index = function(req, res){
  
  client.games({ limit: 20 }, function(err, games) {
    console.log(games[0].game);
    res.render('index', { title: 'Twitch Express Games List', games: games });
  });
  
};