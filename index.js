// see: https://github.com/expressjs/session#session-store-implementation

const bourne = JSON; // TODO replace with @hapi/bourne

module.exports = db => {
  db.exec('CREATE TABLE IF NOT EXISTS express_session (id TEXT PRIMARY KEY, data TEXT)');

  const _get     = db.prepare('SELECT data FROM express_session WHERE id=?');
  const _set     = db.prepare('INSERT INTO express_session (id, data) VALUES (?, ?)');
  const _destroy = db.prepare('DELETE FROM express_session WHERE id=?');
  const _length  = db.prepare('SELECT COUNT(*) FROM express_session');
  const _clear   = db.prepare('DELETE FROM express_session');

  return { get, set, length, clear, destroy, on };

  function on(event) { console.log(`[express-session-better-sqlite3] on() NOT YET IMPLEMENTED FOR EVENT '${event}'`); };

  function get(id, callback) {
    try {
      const res = _get.get(id);
      if(res) callback(null, bourne.parse(res.data));
      else callback();
    } catch(err) {
      callback(err);
    }
  }

  function set(id, data, callback) {
    try {
      _set.run(id, JSON.stringify(data));
      callback(null, []);
    } catch(err) {
      callback(err);
    }
  }

  function length(callback) {
    try {
      const res = _length.get()['COUNT(*)'];
      callback(null, res);
    } catch(err) {
      callback(err);
    }
  }

  function clear(callback) {
    try {
      _clear.run();
      callback();
    } catch(err) {
      callback(err);
    }
  }

  function destroy(id, callback) {
    try {
      _destroy.run(id);
      callback();
    } catch(err) {
      callback(err);
    }
  }
};
