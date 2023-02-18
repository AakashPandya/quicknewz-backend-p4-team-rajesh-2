const mongoose = require("mongoose");

const dbURL = "mongodb+srv://test12:test12@cluster0.adge8n4.mongodb.net/test";

module.exports = async () => {
  try {
    await mongoose.connect(dbURL, { useNewUrlParser: true });
  } catch (error) {
    throw new Error(error);
  }
};
