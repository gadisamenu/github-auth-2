import { Request } from "express";
import IGithubIntegration from "./models/github-integration";

declare interface AppRequest extends Request {
  user?: IGithubIntegration;
}
