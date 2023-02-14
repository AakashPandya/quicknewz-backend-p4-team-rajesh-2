import * as functions from "firebase-functions";

import cors from "cors";
import express from "express";
import headlinesRoutes from "./routes/headlinesRoutes";
import authRoutes from "./routes/authRoutes";

// import mongoose from "mongoose";

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("APP 6 IS WORKING FINE");
});
app.use("/headlines", headlinesRoutes);
app.use("/auth", authRoutes);

exports.app = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
    secrets: ["MONGODB_URI", "ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET"],
  })
  .https.onRequest(app);
