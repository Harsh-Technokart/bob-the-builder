import { Router } from "express";
import { createUser } from "../controller/user.controller";

const loginRouter = Router();

loginRouter.post("/", createUser);

export default loginRouter;
