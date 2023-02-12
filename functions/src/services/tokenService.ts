import config from "../config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string, mail: string) => {
  const payload = {
    sub: userId,
    mail,
  };

  return jwt.sign(payload, config?.jwt.accessTokenSecret, { expiresIn: "1hr" });
};
