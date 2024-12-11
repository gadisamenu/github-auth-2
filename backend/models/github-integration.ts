import { model, Schema, Types } from "mongoose";

export const DOCUMENT_NAME = "Github-Integration";
export const COLLECTION_NAME = "github-integrations";

export default interface IGithubIntegration {
  _id?: Types.ObjectId;
  id: number;
  avatar_url: string;
  login: string;
  email: string;
  bio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IGithubIntegration>(
  {
    id: {
      type: Number,
      unique: true,
      required: false,
      sparse: true,
    },
    email: {
      type: Schema.Types.String,
      required: false,
      sparse: true,
    },
    avatar_url: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    login: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

export const GithubIntegrationModel = model<IGithubIntegration>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
