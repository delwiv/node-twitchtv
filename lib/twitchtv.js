'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _ramda = require('ramda');

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import requestP from 'request-promise';
var TWITCH_URL = 'https://api.twitch.tv/kraken';
var TWITCH_API_URL = 'http://api.twitch.tv/api';

var REQUIRED_FIELDS = ['client_id', 'username', 'password', 'scope'];

var TwitchClient = function () {
  function TwitchClient() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TwitchClient);

    if (!config.client_id) config.client_id = process.env.TWITCH_CLIENT_ID;
    REQUIRED_FIELDS.forEach(function (field) {
      return !config[field] && _winston2.default.warn(field + ' is required');
    });
    (0, _assign2.default)(this, config);

    return this;
  }

  (0, _createClass3.default)(TwitchClient, [{
    key: 'retrieveResource',
    value: function retrieveResource(url, callback) {
      if (url == 'undefined' || !url) return false;
      if (!callback || typeof callback != 'function') return false;

      _requestPromise2.default.get({
        url: url + '?' + this.client_id
      }, function (err, response, body) {
        body = JSON.parse(body);
        if (callback) callback.call(this, err, body);
      });
    }
  }, {
    key: 'getAuthUrl',
    value: function getAuthUrl(config) {
      var params = (0, _extends3.default)({
        client_id: this.client_id,
        scope: this.scope,
        response_type: 'code'
      }, config);

      return TWITCH_URL + '/oauth2/authorize?' + _querystring2.default.stringify(params);
    }

    // games(params, callback) {
    //   if (!callback || typeof callback != 'function') return false;

    //   request.get({
    //     url: TWITCH_URL + "/games/top?" + this.client_id,
    //     qs: params
    //   }, function(err, response, body) {
    //     body = JSON.parse(body);
    //     var games = body.top;
    //     if (callback) callback.call(this, null, games, body);
    //   });
    // }

    // channels(params, callback) {
    //   if (typeof params.channel == 'undefined' || !params.channel) return false;

    //   return this.retrieveResource(TWITCH_URL + "/channels/" + params.channel, callback);
    // }

    // streams(params, callback) {
    //   if (typeof params.channel == 'undefined' || !params.channel) return false;

    //   return this.retrieveResource(TWITCH_URL + "/streams/" + params.channel, callback);
    // }

    // videos(params, callback) {
    //   if (typeof params.channel == 'undefined' || !params.channel) return false;

    //   return this.retrieveResource(TWITCH_URL + "/channels/" + params.channel + "/videos", callback);
    // }

    // users(params, callback) {
    //   if (typeof params.user == 'undefined' || !params.user) return false;

    //   return this.retrieveResource(TWITCH_URL + "/users/" + params.user, callback);
    // }

    // channelinfo(params, callback) {
    //   if (typeof params.channel == 'undefined' || !params.channel) return false;

    //   return this.retrieveResource(TWITCH_API_URL + "/channels/" + params.channel + "/panels", callback);
    // }

    // follows(params, callback) {
    //     if (typeof params.channel == 'undefined' || !params.channel) return false;

    //     return this.retrieveResource(TWITCH_URL + "/channels/" + params.channel + "/follows", callback);
    // }

  }]);
  return TwitchClient;
}();

exports.default = TwitchClient;