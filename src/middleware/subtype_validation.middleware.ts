import { Request, Response, NextFunction } from "express";
import { typeNameSchema } from "../validation/subtype.type.validation";

const getAllSubtypesValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = typeNameSchema.validate(req.params.type_name);
  if (error) {
    res.status(422).json({
      status_code: 422,
      status: false,
      message: "Invalid Type Name Parameters",
      data: [],
    });
  } else {
    next();
  }
};

export { getAllSubtypesValidationMiddleware };
