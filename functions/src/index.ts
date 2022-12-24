import * as functions from "firebase-functions";

import express from "express";
import headlinesRoutes from "./routes/headlinesRoutes";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    try {
      app.use("/headlines", headlinesRoutes);
    } catch (ex) {
      console.log(ex);
    }
  })
  .catch((ex) => console.log("something went wrong while connecting db", ex));

exports.app = functions.https.onRequest(app);
