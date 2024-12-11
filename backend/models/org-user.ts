import { model, Schema } from "mongoose";

export const DOCUMENT_NAME = "Organization-User";
export const COLLECTION_NAME = "organization-users";

export interface IOrganizationUser {
  login: string;
  id: number;
  type: string; // e.g., "User", "Bot"
  site_admin: boolean;
  avatar_url: string;
  organization: string;
}

const schema = new Schema<IOrganizationUser>(
  {
    login: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    site_admin: { type: Boolean, required: true },
    avatar_url: { type: String, required: false },
    organization: { type: String, required: true },
  },
  { timestamps: false }
);

export const OrganizationUserModel = model<IOrganizationUser>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
