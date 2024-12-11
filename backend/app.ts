import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/config";
import authRouter from "./routes/auth";

const app: Express = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("health");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ msg: "internal server error", error: err });
  next();
});

mongoose.connect(config.MONGO_URL).then(() => {
  console.log("[server]: Database connected");
  app.listen(config.PORT, () => {
    console.log(
      `[server]: Server is running at http://localhost:${config.PORT}`
    );
  });
});
