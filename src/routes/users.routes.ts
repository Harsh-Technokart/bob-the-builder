import { Router } from "express";
import { validate } from "express-validation";
// import {
//   change_user_activation_validation,
//   createSystemUserValidation,
//   editSystemUserValidation,
//   take_action_system_user_validation,
// } from "../validations/system-users";
import { createUser } from "../controller/user.controller";
// import { systemUserErrorHandler } from "../error/system-user.error";

const systemUserRouter = Router();

systemUserRouter.post("/", createUser);

export default systemUserRouter;
