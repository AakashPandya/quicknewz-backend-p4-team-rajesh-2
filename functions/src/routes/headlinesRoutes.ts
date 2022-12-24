import express, { Request, Response } from "express";

const router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  res.send([{ title: "Times of India" }]);
});

export default router;
