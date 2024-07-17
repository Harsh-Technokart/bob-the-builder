import { Schema, model, type AggregatePaginateModel } from "mongoose";
import validator from "validator";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { ISystemUserModel } from "../interface/index";

const systemUserSchema = new Schema<ISystemUserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email_address: {
      type: Schema.Types.String,
      required: [true, "Email address is required"],
      validate: [validator.isEmail, "Enter a valid email address"],
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

systemUserSchema.plugin(aggregatePaginate);

const systemUser = model<
  ISystemUserModel,
  AggregatePaginateModel<ISystemUserModel>
>("system_user", systemUserSchema);

export default systemUser;
