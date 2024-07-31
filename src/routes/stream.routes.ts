import { Router } from "express";
import { streamPresignedUrlController } from "../controller";

const streamRouter = Router();

streamRouter.get("/", streamPresignedUrlController);

export default streamRouter;
