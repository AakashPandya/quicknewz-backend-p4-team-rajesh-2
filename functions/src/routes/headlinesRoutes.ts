// import * as functions from "firebase-functions";

import express, { Request, Response } from "express";

import headlinesModel from "../models/headline";

const router = express.Router();

router.route("/").get(async (req: Request, res: Response) => {
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
