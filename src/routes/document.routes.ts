import { Router } from "express";
import { uploadDocumentsController } from "../controller";

const documentRouter = Router();

documentRouter.post("/", uploadDocumentsController);

export default documentRouter;
