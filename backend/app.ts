import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&retryWrites=true&w=majority`;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

mongoose.connect(url).then(() => {
  console.log("[server]: Database connected");
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
