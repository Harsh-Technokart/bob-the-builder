import { AggregatePaginateModel, model, Schema } from "mongoose";
import { IFileTypeModel } from "../interface";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const fileSchema = new Schema<IFileTypeModel>(
  {
    subtype_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Subtype ID is required"],
    },
    file_name: { type: String, reqired: [false, "File name is required"] },
    file_access_url: {
      type: String,
      required: [true, "File access url is required"],
    },
    created_by: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

fileSchema.plugin(mongooseAggregatePaginate);

const file = model<IFileTypeModel, AggregatePaginateModel<IFileTypeModel>>(
  "file",
  fileSchema
);

export default file;
