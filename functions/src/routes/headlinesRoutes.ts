import express, { Request, Response } from "express";

import headlinesModel from "../models/headline";
import mongoose from "mongoose";

const dbURL = "mongodb+srv://test12:test12@cluster0.adge8n4.mongodb.net/test";

const connection = async () => {
  try {
    await mongoose.connect(dbURL);
  } catch (error) {
    console.log("Database connectivity error", error);
  }
};
const router = express.Router();

router.route("/").get(async (req: Request, res: Response) => {
  console.log("HELLO AAKASH");
  await connection();
  const headlines = await headlinesModel.find(
    {
      title: new RegExp("", "i"),
    },
    { _id: 0 },
    { createdAt: -1 }
  );
  res.send(headlines);
});

export default router;
