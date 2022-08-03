const mongoose = require("mongoose");

const mongoDbUrl =
  "mongodb+srv://Sayanthan12:W1ED2MtTTGKm6IOC@cluster2.owazh.mongodb.net/vehicle_registration?retryWrites=true&w=majority";

let _db;

const initDb = (callback) => {
  if (_db) {
    return callback(null, _db);
  }
  mongoose
    .connect(mongoDbUrl)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialzed");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
