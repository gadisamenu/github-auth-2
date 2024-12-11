import { Schema, model } from "mongoose";

export const DOCUMENT_NAME = "PullRequest";
export const COLLECTION_NAME = "pull-requestes";

export interface IPullRequest {
  id: number;
  node_id: string;
  title: string;
  body: string;
  state: string;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
  merged_at?: Date;
  user_login: string;
  user_id: Number;
  repo_name: string;
  organization: string;
}

const PullRequestSchema = new Schema<IPullRequest>(
  {
    id: { type: Number, required: true, unique: true },
    node_id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: false },
    state: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    closed_at: { type: Date, required: false },
    merged_at: { type: Date, required: false },
    user_login: { type: String, required: true },
    user_id: { type: Number, required: true },
    repo_name: { type: String, required: true },
    organization: { type: String, required: true },
  },
  { timestamps: false }
);

export const PullRequestModel = model<IPullRequest>(
  DOCUMENT_NAME,
  PullRequestSchema,
  COLLECTION_NAME
);
