import { createSubtype, getAllSubtypes } from "./subtype.query";
import {
  uploadDocumentsForSpecificSubtype,
  getPresignedUrl,
  streamPresignedUrls,
} from "./document.query";

export {
  createSubtype,
  getAllSubtypes,
  uploadDocumentsForSpecificSubtype,
  getPresignedUrl,
  streamPresignedUrls,
};
