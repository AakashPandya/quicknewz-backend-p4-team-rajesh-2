import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string, mail: string) => {
  const payload = {
    sub: userId,
    mail,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1hr",
  });
};
