/**
 * Tests adapted from: https://github.com/rawberg/connect-sqlite3
 */

const { assert } = require('chai');

const betterSqlite3 = require('better-sqlite3');

const implementation = require('.');

/* compatible with old constructor used in these tests */
function getStore({ db }) {
  return implementation(betterSqlite3(db, { verbose:process.env.DEBUG_SQLITE && console.error }));
}

describe('express-session-better-sqlite3', function() {
  const memStore = getStore({ db:':memory:' });

  it('should save a new session record', done => {
    memStore.set('1111222233334444', { cookie:{ maxAge:2000 }, name:'sample name' }, (err, rows) => {
      if(err) return done(err);
      assert.isEmpty(rows);
      done();
    });
  });


  it('should retrieve an active session', done => {
    memStore.get('1111222233334444', (err, session) => {
      assert.isNull(err);
      assert.deepEqual(session, { cookie:{ maxAge:2000 }, name:'sample name' });
      done();
    });
  });

  it('should gracefully handle retrieving an unkonwn session', done => {
    memStore.get('hope-and-change', (err, rows) => {
      if(err) return done(err);

      assert.isUndefined(rows);
      done();
    });
  });

  it('should only contain one session', done => {
    memStore.length((err, len) => {
      if(err) return done(err);

      assert.equal(len, 1);
      done();
    });
  });

  it('should clear all session records', done => {
    memStore.clear(err => {
      if(err) return done(err);

      memStore.length((err, len) => {
        if(err) return done(err);

        assert.equal(len, 0);
        done();
      });
    });
  });

  it('should destroy a session', function(done) {
    memStore.set('555666777', { cookie:{ maxAge:1000 }, name:'Rob Dobilina' }, (err, rows) => {
      if(err) return done(err);

      assert.isEmpty(rows);

      memStore.destroy('555666777', function(err) {
        if(err) return done(err);

        memStore.length(function(err, len) {
          if(err) return done(err);
          assert.equal(len, 0);
          done();
        });
      });
    });
  });
});
