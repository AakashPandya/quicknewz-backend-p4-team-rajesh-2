import * as functions from "firebase-functions";

import cors from "cors";
import express from "express";
import headlinesRoutes from "./routes/headlinesRoutes";
import mongoose from "mongoose";

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

functions.logger.log("Start 312");

mongoose
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    try {
      functions.logger.log("Connected 321");
      app.use("/headlines", headlinesRoutes);
    } catch (ex) {
      console.log(ex);
    }
  })
  .catch((ex) => {
    functions.logger.log("error", ex);
    console.log("something went wrong while connecting db", ex);
  });

functions.logger.log("End");

app.get("/", (req, res) => {
  res.send("APP2 IS WORKING FINE");
});

exports.app = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
    secrets: ["MONGODB_URI"],
  })
  .https.onRequest(app);
