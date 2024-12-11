import { Request, Response } from "express";
import {
  fetchGitHubData,
  getGithubAccessToken,
  getGitHubUserData,
} from "../helpers/github_auth";
import IGithubIntegration, {
  GithubIntegrationModel,
} from "../models/github-integration";

const getAccessToken = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (code) {
    const token = await getGithubAccessToken(code as string);
    if (token) {
      const userInfo = await getGitHubUserData(token);

      const existingUser = await GithubIntegrationModel.findOne({
        id: userInfo.id,
      });
      let user;

      if (existingUser == null) {
        const userData: IGithubIntegration = {
          id: userInfo.id,
          login: userInfo.login,
          email: userInfo.email,
          avatar_url: userInfo.avatar_url,
          bio: userInfo.bio,
        };
        user = await GithubIntegrationModel.create(userData);
      } else {
        existingUser.updatedAt = new Date();
        user = await existingUser.save();
      }
      fetchGitHubData(user.login, token);
      res.json({ accessToken: token, user: user });
      return;
    }
    res.status(400).json({ msg: "expired code" });
    return;
  }
  res.status(400).json({ msg: "code not found " });
};

const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const existingUser = await GithubIntegrationModel.findOne({
      id: id,
    });

    if (!existingUser) {
      res.status(401).json({ msg: "unauthenticated" });
      return;
    } else {
      await GithubIntegrationModel.deleteOne({ id: id });
      res.json({ msg: "success" });
      return;
    }
  }
  res.status(400).json({ msg: "id not provided" });
};

const AuthController = {
  getAccessToken,
  removeUser,
};

export default AuthController;
