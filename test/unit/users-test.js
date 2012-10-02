var TwitchClient = require("../../node-twitchtv")
  , should = require("should")
  , account = require("../conf/example.json");

describe("Channels", function() {
  
  var client = new TwitchClient(account);
  
  it("should return false if channel is missing in params", function() {
    client.users({}, true).should.be.false;
  });
  it("should return false if callback isn't passed", function() {
    client.users({ channel: "awesome" }).should.be.false;
  });
  it("should return false if callback is not a function", function() {
    client.users({ channel: "awesome" }, true).should.be.false;
  });
});
