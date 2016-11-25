import nock from 'nock';
import assert from 'assert';
import createChannel from '../lib/slack-create-channel';

describe('slack-create-channel', () => {
  describe('.createChannel()', () => {
    var opts;

    before(() => {
      opts = {
        channelName: 'newchannel',
        org: 'myorg',
        token: 'mytoken'
      };
    });

    it("succeeds when ok", (done) => {
      nock(`https://${opts.org}.slack.com`).
        post('/api/channel.create').
        reply(200, { ok: true });

      createChannel(opts, (err) => {
        assert.equal(err, null);
        done();
      });
    });

    it("passes along an error message", (done) => {
      nock(`https://${opts.org}.slack.com`).
        post('/api/channel.create').
        reply(200, {
          ok: false,
          error: 'other error'
        });

      createChannel(opts, (err) => {
        assert.notEqual(err, null);
        assert.equal(err.message, 'other error');
        done();
      });
    });
  });
});
