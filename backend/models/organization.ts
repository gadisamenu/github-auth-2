import { model, Schema, Types } from "mongoose";

export const DOCUMENT_NAME = "Organization";
export const COLLECTION_NAME = "organizations";

export default interface IOrganization {
  _id?: Types.ObjectId;
  login: string;
  id: number;
  node_id: string;
  user: string;
  url: string;
  avatar_url: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IOrganization>(
  {
    id: {
      type: Number,
      sparse: true,
    },
    user: {
      type: String,
      required: true,
    },
    node_id: {
      type: Schema.Types.String,
      required: true,
      sparse: true,
    },
    login: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
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

schema.index({ id: 1, user: 1 }, { unique: true });

export const OrganizationModel = model<IOrganization>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
