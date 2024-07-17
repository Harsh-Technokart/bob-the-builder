import { type Document, type Schema } from "mongoose";
import { ITypeName } from "./type.interface";

export interface ISubtypeModel extends Document {
  type_name: ITypeName;
  subtype_name: string;
  parent?: string | null;
  created_by: Schema.Types.ObjectId;
}
