import { Router } from "express";
import { validate } from "express-validation";
import { createSubtypeController } from "../controller/subtype.controller";

const subtypeRouter = Router();

subtypeRouter.post("/", createSubtypeController);

export default subtypeRouter;
