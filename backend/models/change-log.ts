import { model, Schema } from "mongoose";

export const DOCUMENT_NAME = "ChangeLog";
export const COLLECTION_NAME = "change-logs";

export interface IChangeLog {
  issue_id: number;
  changes: {
    field: string;
    from: string;
    to: string;
  }[];
  changed_at: Date;
  user: {
    login: string;
    id: number;
  };
}

const ChangeLogSchema = new Schema<IChangeLog>(
  {
    issue_id: { type: Number, required: true },
    changes: [
      {
        field: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
    changed_at: { type: Date, required: true },
    user: {
      login: { type: String, required: true },
      id: { type: Number, required: true },
    },
  },
  { timestamps: false }
);

export const ChangeLogModel = model<IChangeLog>(
  DOCUMENT_NAME,
  ChangeLogSchema,
  COLLECTION_NAME
);
