import { Joi } from "express-validation";

export const typeNameSchema = Joi.string()
  .valid(
    "Society Papers",
    "Pre Appointment Appointment Letters",
    "Society Correspondence",
    "Registered Documents"
  )
  .required();
