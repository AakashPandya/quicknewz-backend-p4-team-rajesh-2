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
      const filterQuery: any = {};

      if (req.query.next) {
        filterQuery._id = { $lt: req.query.next };
      }
      if (req.query.searchText) {
        filterQuery.title = { $regex: req.query.searchText };
      }
      const headlines = await headlinesModel
        .find(filterQuery)
        .limit(8)
        .sort({ createdAt: -1 });
      const next = headlines[headlines.length - 1]._id;
      res.send({ headlines, next });
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
