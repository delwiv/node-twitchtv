var TwitchClient = require("../node-twitchtv")
  , should = require("should")
  , account = require("./conf/example.json");

describe("A lovely NodeJS based Twitch Client", function() {
  
  var client = new TwitchClient(account);
  
  describe("has a games resource", function() {
    it("should return a list of games", function(done) {
      client.games({}, function(err, games) {
        games.length.should.equal(10);
        games[0].should.have.ownProperty("game");
        games[0].should.have.ownProperty("viewers");
        games[0].should.have.ownProperty("channels");
        done();
      });
    });
  });
  
  describe("has a channel resource", function() {
    it("should return information based on a channel", function(done) {
      client.channels({ channel: "kungentv" }, function(err, ch) {
       
        ch.should.have.ownProperty("name");
        ch.should.have.ownProperty("game");
        ch.should.have.ownProperty("banner");
        ch.should.have.ownProperty("logo");
        ch.should.have.ownProperty("url");
        
        done();
      });
    });
  });
  
  describe("has a user resource", function() {
    it("should return information based on a user", function(done) {
      client.users({ user: "kungentv" }, function(err, ch) {
       
        ch.should.have.ownProperty("name");
        ch.should.have.ownProperty("created_at");
        ch.should.have.ownProperty("updated_at");
        ch.should.have.ownProperty("logo");
        ch.should.have.ownProperty("display_name");
        
        done();
      });
    });
  });
});
