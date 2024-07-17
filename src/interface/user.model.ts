import { type Document, type Schema } from "mongoose";

export interface ISystemUserModel extends Document {
  name: string;
  email_address: string;
  password: string;
  created_by: Schema.Types.ObjectId;
}
