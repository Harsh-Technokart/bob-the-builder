import { Router } from "express";
import {
  uploadDocumentsController,
  getPresignedUrlController,
  streamPresignedUrlController,
} from "../controller";

const documentRouter = Router();

documentRouter.post("/", uploadDocumentsController);
documentRouter.get("/:document_id", getPresignedUrlController);
documentRouter.get(
  "/stream",
  (req, res, next) => {
    console.log("Trying to stream middleware hit");
    next();
  },
  streamPresignedUrlController
);

export default documentRouter;
