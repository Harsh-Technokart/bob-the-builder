import { type Document, type Schema } from "mongoose";

export interface IFileTypeModel extends Document {
  subtype_id: Schema.Types.ObjectId;
  file_name: string;
  file_access_url: string;
  created_by: Schema.Types.ObjectId;
}
