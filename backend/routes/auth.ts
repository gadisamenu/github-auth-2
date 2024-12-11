import { Router } from "express";
import AuthController from "../controllers/auth";
import { fetchGitHubData } from "../helpers/github_auth";
import { authenticate } from "../middleware/authenticate";
import { AppRequest } from "../types";

const authRouter = Router();

authRouter.get("/get-access-token", AuthController.getAccessToken);
authRouter.delete("/remove/:id", AuthController.removeUser);

authRouter.get("/", authenticate, async (req: AppRequest, res) => {
  if (req.user && req.headers.authorization) {
    res.json(await fetchGitHubData(req.user.login, req.headers.authorization));
    return;
  }
  res.status(401).json({ msg: "unauthorized" });
});

export default authRouter;
