import { Router } from "express";
import { getAllSubtypesValidationMiddleware } from "../middleware/subtype_validation.middleware";
import {
  createSubtypeController,
  getAllSubtypesController,
} from "../controller";

const subtypeRouter = Router();

subtypeRouter.post("/", createSubtypeController);
subtypeRouter.get(
  "/:type_name",
  getAllSubtypesValidationMiddleware,
  getAllSubtypesController
);

export default subtypeRouter;
