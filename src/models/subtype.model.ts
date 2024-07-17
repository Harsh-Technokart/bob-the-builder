import { Schema, model, type AggregatePaginateModel } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { ISubtypeModel } from "../interface";

const subtypeSchema = new Schema<ISubtypeModel>(
  {
    type_name: { type: String, required: [true, "Type name is required"] },
    subtype_name: {
      type: String,
      required: [true, "Subtype name is required"],
    },
    parent: { type: String, required: false },
    created_by: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

subtypeSchema.index({ type_name: 1, subtype_name: 1 }, { unique: true });
subtypeSchema.plugin(mongooseAggregatePaginate);

const subtype = model<ISubtypeModel, AggregatePaginateModel<ISubtypeModel>>(
  "subtype",
  subtypeSchema
);

export default subtype;
