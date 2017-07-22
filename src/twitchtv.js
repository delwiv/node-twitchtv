// import requestP from 'request-promise';
import request from 'request-promise';
import querystring from 'querystring';
import { merge } from 'ramda';
import logger from 'winston';

const TWITCH_URL = 'https://api.twitch.tv/kraken';
const TWITCH_API_URL = 'http://api.twitch.tv/api';

const REQUIRED_FIELDS = ['client_id', 'username', 'password', 'scope'];

export default class TwitchClient {
  constructor(config = {}) {
    if (!config.client_id)
      config.client_id = process.env.TWITCH_CLIENT_ID
    REQUIRED_FIELDS.forEach(field => !config[field] && logger.warn(`${field} is required`));
    Object.assign(this, config);

    return this;
  }

  retrieveResource(url, callback) {
    if (url == 'undefined' || !url) return false;
    if (!callback || typeof callback != 'function') return false;

    request.get({
      url: `${url}?${this.client_id}`
    }, function(err, response, body) {
      body = JSON.parse(body);
      if (callback) callback.call(this, err, body);
    });
  };

  getAuthUrl(config) {
    const params = {
      client_id: this.client_id,
      scope: this.scope,
      response_type: 'code',
      ...config
    };

    return `${TWITCH_URL}/oauth2/authorize?${querystring.stringify(params)}`
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
}
