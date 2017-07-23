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

var _paramCase = require('param-case');

var _paramCase2 = _interopRequireDefault(_paramCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TWITCH_URL = 'https://api.twitch.tv/kraken';
var TWITCH_API_URL = 'http://api.twitch.tv/api';

var REQUIRED_FIELDS = ['clientId', 'clientSecret', 'redirectUri', 'scope'];

var TwitchClient = function () {
  function TwitchClient() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TwitchClient);

    if (!config.clientId) config.clientId = process.env.TWITCH_CLIENT_ID;
    REQUIRED_FIELDS.forEach(function (field) {
      return !config[field] && _winston2.default.warn(field + ' is required');
    });
    (0, _assign2.default)(this, config);

    return this;
  }

  (0, _createClass3.default)(TwitchClient, [{
    key: 'getParams',
    value: function getParams(config) {
      var _this = this;

      return REQUIRED_FIELDS.reduce(function (acc, field) {
        acc[(0, _paramCase2.default)(field)] = config[field] || _this[field];
        return acc;
      }, {});
    }
  }, {
    key: 'retrieveResource',
    value: function retrieveResource(url, callback) {
      if (url == 'undefined' || !url) return false;
      if (!callback || typeof callback != 'function') return false;

      _requestPromise2.default.get({
        url: url + '?' + this.clientId
      }, function (err, response, body) {
        body = JSON.parse(body);
        if (callback) callback.call(this, err, body);
      });
    }
  }, {
    key: 'getAuthUrl',
    value: function getAuthUrl(config) {
      var uri = TWITCH_URL + '/oauth2/authorize?' + _querystring2.default.stringify((0, _extends3.default)({}, this.getParams(config), {
        response_type: 'code'
      }));

      console.log({ uri: uri });
      return uri;
    }
  }, {
    key: 'verify',
    value: function verify(config) {
      var uri = TWITCH_API_URL + '/oauth2/token?' + _querystring2.default.stringify((0, _extends3.default)({}, this.getParams(config), {
        response_type: 'code'
      }));
      return _requestPromise2.default.post(uri);
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