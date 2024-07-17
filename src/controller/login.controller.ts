import { type NextFunction, type Request, type Response } from "express";
import { createUserQuery } from "../query/user.query";

function createUser(
  req: Request<
    unknown,
    unknown,
    {
      name: string;
      email_address: string;
      mobile_number: string;
    }
  >,
  res: Response,
  next: NextFunction
): void {
  createUserQuery({
    name: req.body.name,
    emailAddress: req.body.email_address,
  })
    .then((details) => {
      res.status(details.status_code).json({
        status: true,
        message: details.message,
        user_id: details.userId,
      });
    })
    .catch((error) => {
      next(error);
    });
}

export { createUser };
