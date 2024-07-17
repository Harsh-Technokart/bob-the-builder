import type { NextFunction, Request, Response } from "express";

const authentication = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ("details" in req.session) {
      next();
    } else {
      res.status(401).json({
        status: false,
        status_code: 401,
        message: "User authentication required",
      });
    }
  };
};

export default authentication;
