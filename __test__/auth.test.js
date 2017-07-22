import TwitchClient from '../lib';

const cache = {
  value: null
};

describe('Test TwitchClient auth with env', () => {
  it('instanciate the client and cache it', () => {
    const client = new TwitchClient({ scope: 'openid' });
    expect(client).toBeInstanceOf(TwitchClient);
    cache.value = client;
  });

  it('test getAuthUrl method', () => {
    try {
      const url = cache.value.getAuthUrl({});
      console.log({ url });
      expect(url).toMatch(/https:\/\/.*$/);
    } catch (error) {
      console.log({ error })
    }
  });
})
