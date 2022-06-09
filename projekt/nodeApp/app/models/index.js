const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.ad = require("./ads/ads.model.js")(mongoose);
db.cat = require("./categories/categories.model.js")(mongoose);
db.user = require("./users/user.model.js")(mongoose);

module.exports = db;