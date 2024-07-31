import { createSubtype, getAllSubtypes } from "./subtype.query";
import {
  uploadDocumentsForSpecificSubtype,
  getPresignedUrl,
} from "./document.query";
import { streamPresignedUrls } from "./stream.query";

export {
  createSubtype,
  getAllSubtypes,
  uploadDocumentsForSpecificSubtype,
  getPresignedUrl,
  streamPresignedUrls,
};
