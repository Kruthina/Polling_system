var Datastore = require("nedb");
var resultsDB = new Datastore({ filename: "results.db", autoload: true });

module.exports = resultsDB;
