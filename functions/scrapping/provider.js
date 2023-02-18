const mongoose = require("mongoose");
const { sourceModel } = require("./model");
const dbConnection = require("./connection");

dbConnection();

const newsProviders = [
  { provider: "NDTV" },
  { provider: "NEWS18" },
  { provider: "THE HINDU" },
];

(async () => {
  try {
    await sourceModel
      .insertMany(newsProviders)
      .then(() => console.log("providers inserted"))
      .catch((err) => console.log("error while inserting", err));
  } catch (err) {
    console.log("Exception caught at newsProvider", err);
    throw new Error(err);
  }
})();
