import { type NextFunction, type Request, type Response } from "express";
import { createSubtype } from "../query/subtype.query";
import { ITypeName } from "../interface";
import { MongoServerError } from "mongodb";

function createSubtypeController(
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
): void {
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
          status: false,
          message: `There can only be one '${subtypeName}' for Type: ${typeName}.`,
        });
      } else {
        next(error);
      }
    });
}

export { createSubtypeController };
