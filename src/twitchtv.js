import request from 'request';
import { merge } from 'ramda';
import logger from 'winston';

const TWITCH_URL = 'https://api.twitch.tv/kraken';
const TWITCH_API_URL = 'http://api.twitch.tv/api';

const REQUIRED_FIELDS = ['clientId', 'username', 'password', 'scope'];

const retrieveResource = (url, callback) => {
  if (url == 'undefined' || !url) return false;
  if (!callback || typeof callback != 'function') return false;

  var self = this;

  request.get({
    url: url
  }, function(err, response, body) {
    body = JSON.parse(body);
    if (callback) callback.call(self, err, body);
  });
};

export default class TwitchClient {
  constructor(config = {}) {
    REQUIRED_FIELDS.forEach(field => !config[field] && logger.warn(`${field} is required`));
    merge(this, config);


    return this;
  }

  auth(config) {
    logger.warn('Authorization is still being implemented.');
    const params = merge({}, {
      client_id: this.clientId,
      username: this.username,
      password: this.password,
      scope: this.scope,
      response_type: "token"
    }, config);

    request.post({
      url: TWITCH_URL + "/oauth2/authorize",
      form: params
    }, function(err, response, body) {
      console.log({err, response, body});
    });
  }

  games(params, callback) {
    if (!callback || typeof callback != 'function') return false;

    var self = this;

    request.get({
      url: twitch_url + "/games/top",
      qs: params
    }, function(err, response, body) {
      body = JSON.parse(body);
      var games = body.top;
      if (callback) callback.call(self, null, games, body);
    });
  }

  channels(params, callback) {
    if (typeof params.channel == 'undefined' || !params.channel) return false;

    return retrieveResource(twitch_url + "/channels/" + params.channel, callback);
  }

  streams(params, callback) {
    if (typeof params.channel == 'undefined' || !params.channel) return false;

    return retrieveResource(twitch_url + "/streams/" + params.channel, callback);
  }

  videos(params, callback) {
    if (typeof params.channel == 'undefined' || !params.channel) return false;

    return retrieveResource(twitch_url + "/channels/" + params.channel + "/videos", callback);
  }

  users(params, callback) {
    if (typeof params.user == 'undefined' || !params.user) return false;

    return retrieveResource(twitch_url + "/users/" + params.user, callback);
  }

  channelinfo(params, callback) {
    if (typeof params.channel == 'undefined' || !params.channel) return false;

    return retrieveResource(twitch_api_url + "/channels/" + params.channel + "/panels", callback);
  }

  follows(params, callback) {
      if (typeof params.channel == 'undefined' || !params.channel) return false;

      return retrieveResource(twitch_url + "/channels/" + params.channel + "/follows", callback);
  }
}
