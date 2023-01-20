// import * as functions from "firebase-functions";

import express, { Request, Response } from "express";

import headlinesModel from "../models/headline";
import mongoose from "mongoose";

const router = express.Router();

router.route("/").get(async (req: Request, res: Response) => {
  mongoose
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .connect(process.env.MONGODB_URI!)
    .then(async () => {
      const headlines = await headlinesModel.find();
      res.send(headlines);
    })
    .catch((ex) => {
      console.log("something went wrong while connecting db", ex);
    });
});

router.route("/:id").get(async (req: Request, res: Response) => {
  mongoose
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .connect(process.env.MONGODB_URI!)
    .then(async () => {
      const headline = await headlinesModel.findById(req.params.id);
      console.log("headline", headline);
      res.send(headline);
    })
    .catch((ex) => {
      console.log("something went wrong while connecting db", ex);
    });
});

export default router;
