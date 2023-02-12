import { Request, Response } from "express";
import { createUser, getUserByEmail, login } from "../services/userService";

import catchAsync from "../utils/catchAsync";

export const signUp = catchAsync(
  async (request: Request, response: Response) => {
    const { firstName, lastName, email, password } = request.body;
    try {
      const user = await getUserByEmail(email);
      if (!user?._id) {
        const result = await createUser({
          firstName,
          lastName,
          email,
          password,
        });
        response.send(result);
      } else {
        response.status(400).send("Email address already exist");
      }
    } catch (ex) {
      response.status(500).send(ex);
    }
  }
);

export const signIn = catchAsync(
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    try {
      const result = await login(email, password);
      response.send(result);
    } catch (ex) {
      response.status(500).send("Internal server error");
    }
  }
);
