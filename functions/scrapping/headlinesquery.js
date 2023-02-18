const mongoose = require("mongoose");
const { headlinesModel } = require("./model");
const dbConnection = require("./connection");

mongoose.set("strictQuery", true);

var querystr = "india";

dbConnection();
