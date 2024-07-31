import { type NextFunction, type Request, type Response } from "express";
import { UploadedFile } from "express-fileupload";
import {
  uploadDocumentsForSpecificSubtype,
  getPresignedUrl,
  streamPresignedUrls,
} from "../query";

/**
 * @description: upload one or multiple documents for any specific subtype
 * @param req
 *? body: { subtype_id: ObjectId of the subtype this file belongs to }
 *? files: { _any_key_: a file by some key name which is to be uploaded for subtype specified above }
 * @param res
 ** status_code: status code of the response
 ** status: boolean value stating if the response failed or succeeded
 ** message: optional string message
 * @param next
 */
const uploadDocumentsController = (
  req: Request<unknown, unknown, { subtype_id: string }>,
  res: Response,
  _next: NextFunction
): void => {
  if (req.files !== null && req.files !== undefined) {
    const files = req.files.file as unknown as UploadedFile;
    uploadDocumentsForSpecificSubtype(files, req.body.subtype_id)
      .then((details) => {
        res.status(details.status_code).json({
          status_code: details.status_code,
          status: true,
          message: details.message,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status_code: 500,
          status: false,
          message: error.toString(),
        });
      });
  }
};

/**
 *
 * @param req
 *? req.params: document_id: objectid of the document whose presigned url is needed
 * @param res
 ** status_code: status code of the response
 ** status: boolean value stating if the response failed or succeeded
 ** message: optional string message
 ** data: presigned url of the document if document exists in the database
 * @param _next
 */
const getPresignedUrlController = (
  req: Request<{ document_id: string }, unknown, unknown>,
  res: Response,
  _next: NextFunction
): void => {
  getPresignedUrl(req.params.document_id)
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

export { uploadDocumentsController, getPresignedUrlController };
