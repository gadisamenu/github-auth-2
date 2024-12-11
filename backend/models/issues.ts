import { model, Schema } from "mongoose";

export const DOCUMENT_NAME = "Issue";
export const COLLECTION_NAME = "Issues";

export interface IIssue {
  id: number;
  node_id: string;
  title: string;
  body: string;
  state: string;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
  user: {
    login: string;
    id: number;
  };
  labels: string[];
  repo_name: string;
  organization: string;
}

const IssueSchema = new Schema<IIssue>(
  {
    id: { type: Number, required: true, unique: true },
    node_id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: false },
    state: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    closed_at: { type: Date, required: false },
    user: {
      login: { type: String, required: true },
      id: { type: Number, required: true },
    },
    labels: { type: [String], required: false },
    repo_name: { type: String, required: true },
    organization: { type: String, required: true },
  },
  { timestamps: false }
);

export const IssueModel = model<IIssue>(
  DOCUMENT_NAME,
  IssueSchema,
  COLLECTION_NAME
);
