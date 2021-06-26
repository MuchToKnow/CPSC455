const functions = require('firebase-functions');
const MongoClient = require('mongodb').MongoClient;
const user = functions.config().db.user;
const pass = functions.config().db.pass;
const url = `mongodb://${user}:${pass}@35.212.216.150:27017`;
const database = "parkingApp";

const option = {
  numberOfRetries: 5,
  auto_reconnect: true,
  poolSize: 40,
  connectTimeoutMS: 500,
};

function MongoPool() { }

var p_db;

function initPool(cb) {
  MongoClient.connect(url, option, function (err, db) {
    if (err) throw err;

    p_db = db.db(database);
    if (cb && typeof (cb) == 'function')
      cb(p_db);
  });
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb) {
  if (!p_db) {
    initPool(cb);
  }
  else {
    if (cb && typeof (cb) == 'function')
      cb(p_db);
  }
}
MongoPool.getInstance = getInstance;

module.exports = MongoPool;
