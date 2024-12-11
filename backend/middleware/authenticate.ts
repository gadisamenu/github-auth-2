import axios from "axios";
import { NextFunction, Response } from "express";
import { AppRequest } from "../types";

export const authenticate = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    if (token) {
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (response.status === 200) {
        const user = response.data;
        if (user) {
          req.user = user;
          next();
          return;
        }
      }
    }
  }

  res.status(401).json({ msg: "unauthorized" });
};
