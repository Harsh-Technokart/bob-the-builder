import { type NextFunction, type Request, type Response } from "express";
import { createSubtype, getAllSubtypes } from "../query/subtype.query";
import { ITypeName } from "../interface";
import { MongoServerError } from "mongodb";
import { typeNameSchema } from "../validation/subtype.type.validation";

const createSubtypeController = (
  req: Request<
    unknown,
    unknown,
    {
      type_name: ITypeName;
      subtype_name: string;
    }
  >,
  res: Response,
  next: NextFunction
): void => {
  createSubtype({
    type_name: req.body.type_name,
    subtype_name: req.body.subtype_name,
  })
    .then((details) => {
      res.status(details.status_code).json({
        status: true,
        message: details.message,
      });
    })
    .catch((error) => {
      if (error instanceof MongoServerError && error.code === 11000) {
        const typeName = error.keyValue["type_name"];
        const subtypeName = error.keyValue["subtype_name"];
        res.status(400).json({
          status_code: 400,
          status: false,
          message: `There can only be one '${subtypeName}' for Type: ${typeName}.`,
        });
      } else {
        next(error);
      }
    });
};

const getAllSubtypesController = (
  req: Request<{ type_name: ITypeName }, unknown, unknown>,
  res: Response,
  next: NextFunction
): void => {
  console.log("request paramerters: ", req.params.type_name);
  const { error } = typeNameSchema.validate(req.params.type_name);
  if (error) {
    res.status(422).json({
      status_code: 422,
      status: true,
      message: "Invalid Type Name Parameters",
      data: [],
    });
  } else {
    getAllSubtypes({ type_name: req.params.type_name })
      .then((details) => {
        res.status(details.status_code).json({
          status_code: details.status_code,
          status: true,
          message: details.message,
          data: details.data,
        });
      })
      .catch((error) => {
        next(error);
      });
  }
};

export { createSubtypeController, getAllSubtypesController };
