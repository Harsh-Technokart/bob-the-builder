import { type NextFunction, type Request, type Response } from "express";
import { createSubtype, getAllSubtypes } from "../query";
import { ITypeName } from "../interface";
import { MongoServerError } from "mongodb";

/**
 * @description: create a new subtype for any specific page
 * @param req
 ** body: {
 *?  type_name: a predefined string which states the page to which this subtype belongs to,
 *?  subtype_name: string which states the name of the subtype.
 *  }
 * @param res
 ** status_code: status code of the response
 ** status: boolean value stating if the response failed or succeeded
 ** message: optional string message
 * @param next
 */
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
        res.status(500).json({
          status_code: 500,
          status: false,
          message: error.toString(),
        });
      }
    });
};

/**
 * @description: get all subtypes for any specific page
 * @param req
 ** body: {
 *?  type_name: a predefined string which states the page to which this subtype belongs to,
 *  }
 * @param res
 ** status_code: status code of the response
 ** status: boolean value stating if the response failed or succeeded
 ** message: optional string message
 ** data: an array of subtypes available for the specified type
 * @param next
 */
const getAllSubtypesController = (
  req: Request<{ type_name: ITypeName }, unknown, unknown>,
  res: Response,
  next: NextFunction
): void => {
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
      res.status(500).json({
        status_code: 500,
        status: false,
        message: error.toString(),
      });
    });
};

export { createSubtypeController, getAllSubtypesController };
