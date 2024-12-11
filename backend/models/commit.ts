import { model, Schema, Types } from "mongoose";

export const DOCUMENT_NAME = "Commit";
export const COLLECTION_NAME = "commits";

export default interface ICommit {
  _id?: Types.ObjectId;
  sha: string;
  node_id: string;
  author_name: string;
  author_email: string;
  author_date: Date;
  committer_name: string;
  committer_email: string;
  committer_date: Date;
  message: string;
  url: string;
  author_login: string;
  author_id: Number;
  committer_login: string;
  committer_id: Number;
  userlogin: string;
  reponame: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ICommit>(
  {
    sha: { type: String, required: true, unique: true },
    node_id: { type: String, required: true },
    author_name: { type: String, required: true },
    author_email: { type: String, required: true },
    author_date: { type: Date, required: true },
    committer_name: { type: String, required: true },
    committer_email: { type: String, required: true },
    committer_date: { type: Date, required: true },
    message: { type: String, required: true },
    url: { type: String, required: true },
    author_login: { type: String, required: true },
    author_id: { type: Number, required: true },
    committer_login: { type: String, required: true },
    committer_id: { type: Number, required: true },
    userlogin: { type: String, required: true },
    reponame: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index({ sha: 1, repologin: 1 }, { unique: true });

export const CommitModel = model<ICommit>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
