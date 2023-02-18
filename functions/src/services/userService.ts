import User, { IUser } from "../models/user";

import { generateAccessToken } from "./tokenService";
import mongoose from "mongoose";

export const getUserByEmail = async (email: string) => {
  return (
    mongoose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .connect(process.env.MONGODB_URI!)
      .then(async () => {
        const response = await User.findOne({ email });
        return response;
      })
      .catch((ex) => {
        console.log("something went wrong while connecting db", ex);
      })
  );
};

export const createUser = async (userDTO: IUser) => {
  return (
    mongoose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .connect(process.env.MONGODB_URI!)
      .then(async () => {
        const user = new User({ ...userDTO });
        return await user.save();
      })
      .catch((ex) => {
        throw ex;
      })
  );
};

export const login = async (email: string, password: string) => {
  return (
    mongoose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .connect(process.env.MONGODB_URI!)
      .then(async () => {
        const user: any = await getUserByEmail(email);
        if (user && (await user?.isPasswordMatch(password))) {
          return generateAccessToken(user._id, email);
        }
        return false;
      })
      .catch((ex) => {
        throw ex;
      })
  );
};
