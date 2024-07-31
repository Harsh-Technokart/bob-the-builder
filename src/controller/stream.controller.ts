import path from "path";
import { Readable } from "stream";
import { type NextFunction, type Request, type Response } from "express";
import { streamPresignedUrls } from "../query";

/**
 * @description: the user directly accessing the blob url would be !good.
 * so the bloburl would be called from this node server and then
 * the response would be forwarded as a readable stream
 * @param req
 *? req.params:
 *? blobName: actual url which would be used to access the file
 *? sv, spr, st, se, sr, sp, sig: the access params generated in the sas url
 * @param res
 * @param _next
 */

const streamPresignedUrlController = async (
  req: Request<
    {
      blobName: string;
      sv: string;
      spr: string;
      st: string;
      se: string;
      sr: string;
      sp: string;
      sig: string;
    },
    unknown,
    unknown
  >,
  res: Response,
  _next: NextFunction
) => {
  const requiredParams = [
    "blobName",
    "sv",
    "spr",
    "st",
    "se",
    "sr",
    "sp",
    "sig",
  ];
  const missingParams = requiredParams.filter((param) => !req.query[param]);
  if (missingParams.length) {
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: `Missing required query parameters: ${missingParams.join(", ")}`,
    });
  }

  try {
    const { blobName, sv, spr, st, se, sr, sp, sig } = req.query;
    const response: any = await streamPresignedUrls(
      blobName as string,
      sv as string,
      spr as string,
      st as string,
      se as string,
      sr as string,
      sp as string,
      sig as string
    );

    if (response && response.body) {
      res.setHeader(
        "Content-Type",
        response.headers.get("content-type") || "application/octet-stream"
      );
      res.setHeader(
        "Content-Length",
        response.headers.get("content-length") || "0"
      );
      const filename = path.basename(blobName?.toString() ?? "downloaded-file");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );

      // read the file, and pipe the data chunks directly to the response body.
      const nodeReadableStream = Readable.fromWeb(response.body);
      nodeReadableStream.pipe(res);
    } else {
      res.status(500).json({
        status_code: 500,
        status: false,
        message: "Failed to stream the presigned URL",
      });
    }
  } catch (error: any) {
    console.error("Error while streaming:", error.message, error.stack);
    res
      .status(500)
      .json({ status_code: 500, status: false, message: error.message });
  }
};

export { streamPresignedUrlController };
