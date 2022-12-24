import { Request, Response } from "express";

export const getHeadlines = async (req: Request, res: Response) => {
  res.send([{ title: "Times of India" }]);
};
