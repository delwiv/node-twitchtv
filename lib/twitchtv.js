'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _ramda = require('ramda');

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TWITCH_URL = 'https://api.twitch.tv/kraken';
var TWITCH_API_URL = 'http://api.twitch.tv/api';

var REQUIRED_FIELDS = ['clientId', 'username', 'password', 'scope'];

var retrieveResource = function retrieveResource(url, callback) {
  if (url == 'undefined' || !url) return false;
  if (!callback || typeof callback != 'function') return false;

  var self = undefined;

  _request2.default.get({
    url: url
  }, function (err, response, body) {
    body = JSON.parse(body);
    if (callback) callback.call(self, err, body);
  });
};

var TwitchClient = function () {
  function TwitchClient() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TwitchClient);

    REQUIRED_FIELDS.forEach(function (field) {
      return !config[field] && _winston2.default.warn(field + ' is required');
    });
    (0, _ramda.merge)(this, config);

    return this;
  }

  _createClass(TwitchClient, [{
    key: 'auth',
    value: function auth(config) {
      _winston2.default.warn('Authorization is still being implemented.');
      var params = (0, _ramda.merge)({}, {
        client_id: this.client_id,
        username: this.username,
        password: this.password,
        scope: this.scope,
        response_type: "token"
      }, config);

      _request2.default.post({
        url: TWITCH_URL + "/oauth2/authorize",
        form: params
      }, function (err, response, body) {
        console.log({ err: err, response: response, body: body });
      });
    }
  }, {
    key: 'games',
    value: function games(params, callback) {
      if (!callback || typeof callback != 'function') return false;

      var self = this;

      _request2.default.get({
        url: twitch_url + "/games/top",
        qs: params
      }, function (err, response, body) {
        body = JSON.parse(body);
        var games = body.top;
        if (callback) callback.call(self, null, games, body);
      });
    }
  }, {
    key: 'channels',
    value: function channels(params, callback) {
      if (typeof params.channel == 'undefined' || !params.channel) return false;

      return retrieveResource(twitch_url + "/channels/" + params.channel, callback);
    }
  }, {
    key: 'streams',
    value: function streams(params, callback) {
      if (typeof params.channel == 'undefined' || !params.channel) return false;

      return retrieveResource(twitch_url + "/streams/" + params.channel, callback);
    }
  }, {
    key: 'videos',
    value: function videos(params, callback) {
      if (typeof params.channel == 'undefined' || !params.channel) return false;

      return retrieveResource(twitch_url + "/channels/" + params.channel + "/videos", callback);
    }
  }, {
    key: 'users',
    value: function users(params, callback) {
      if (typeof params.user == 'undefined' || !params.user) return false;

      return retrieveResource(twitch_url + "/users/" + params.user, callback);
    }
  }, {
    key: 'channelinfo',
    value: function channelinfo(params, callback) {
      if (typeof params.channel == 'undefined' || !params.channel) return false;

      return retrieveResource(twitch_api_url + "/channels/" + params.channel + "/panels", callback);
    }
  }, {
    key: 'follows',
    value: function follows(params, callback) {
      if (typeof params.channel == 'undefined' || !params.channel) return false;

      return retrieveResource(twitch_url + "/channels/" + params.channel + "/follows", callback);
    }
  }]);

  return TwitchClient;
}();

exports.default = TwitchClient;