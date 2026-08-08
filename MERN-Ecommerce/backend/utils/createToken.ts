import jwt from 'jsonwebtoken';
import type { Response } from "express";

type TokenPayload = {
  userId: string;
};

const gennerateToken = (res: Response, userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if(!secret) {
    throw new Error("JWT_SECRET is not define");
  }

  const payload: TokenPayload = {
    userId,
  };

  const token = jwt.sign({userId}, secret, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30*24*60*60*1000
  })

  return token;
}

export default gennerateToken;