import requestP from 'request-promise';
import request from 'request-promise';
import querystring from 'querystring';
import { merge, uniq } from 'ramda';
import logger from 'winston';
import snake from 'snake-case';

const TWITCH_URL = 'https://api.twitch.tv/kraken';
const TWITCH_API_URL = 'https://api.twitch.tv/api';

const REQUIRED_FIELDS = ['clientId', 'clientSecret', 'redirectUri', 'scope'];

export default class TwitchClient {
  constructor(config = {}) {
    if (!config.clientId)
      config.clientId = process.env.TWITCH_CLIENT_ID
    REQUIRED_FIELDS.forEach(field => !config[field] && logger.warn(`${field} is required`));
    Object.assign(this, config);

    return this;
  }

  getHeaders(accessToken = null) {
    return {
      'Client-ID': this.clientId,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': accessToken ? `OAuth ${accessToken}` : undefined
    }
  }

  getAuthParams(config) {
    return uniq(REQUIRED_FIELDS.concat(Object.keys(config)))
    .reduce((acc, field) => {
      if (config[field] || this[field])
        acc[snake(field)] = config[field] || this[field];
      return acc;
    }, {});
  }

  getAuthUrl(config) {
    const uri = `${TWITCH_URL}/oauth2/authorize?${querystring.stringify({
      ...this.getAuthParams(config),
      response_type: 'code'
    })}`;

    // console.log({uri})
    return uri;
  }

  verify(config) {
    const uri = `${TWITCH_API_URL}/oauth2/token?${querystring.stringify({
      ...this.getAuthParams(config),
      response_type: 'code'
    })}`;
    // console.log({uri})
    return requestP.post(uri)
  }

  getUser(accessToken) {
    const uri = `${TWITCH_URL}/user`;
    return requestP.get({
      uri,
      headers: this.getHeaders(accessToken)
    }).then(JSON.parse)
  }

  searchGame(query) {
    const uri = `${TWITCH_API_URL}/search/games${querystring.stringify({ query })}`
    return requestP.get({
      uri,
      headers: this.getHeaders(),
    })
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
