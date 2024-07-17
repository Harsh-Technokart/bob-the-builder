import express, { type Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { info, authentication } from "./middleware";
import fs from "fs";
import appConfiguration from "./configuration/app.configuration";
import moment from "moment";
import path from "path";
import session from "express-session";
import Mongo_Store from "connect-mongo";
import { checkServerEnvironment } from "./connection/mongo.connection";
import compression from "compression";
import cors from "cors";
import express_file_upload from "express-fileupload";
import systemUserRouter from "./routes/users.routes";

const accessLogger = fs.createWriteStream(
  path.join(__dirname, "logs", "all.log"),
  { flags: "a+" }
);

function setupMiddlewares(app: Application): void {
  dotenv.config();
  morgan.token("date", () => {
    return moment().tz("Asia/Kolkata").format();
  });
  morgan.format(
    "format",
    ":date[Asia/Kolkata] [main] api: :method :url :status :res[content-length] - :response-time ms"
  );
  info("Configuring middlewares");
  app.use(express.json({ limit: "128mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express_file_upload());
  app.use(morgan("format", { stream: accessLogger }));
  app.use(
    morgan(
      ":date[Asia/Kolkata] [main] api: :method :url :status :res[content-length] - :response-time ms"
    )
  );
  app.use(
    session({
      secret: appConfiguration.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: true,
      cookie: {
        sameSite: "lax",
        maxAge: 60 * 60 * 10000,
        secure: false,
      },
      store: new Mongo_Store({
        mongoUrl: checkServerEnvironment(),
      }),
    })
  );
  app.use(compression());
  app.use(cors({ origin: true, credentials: true }));
  info("Middlewares configured");
}

function setupRoutes(app: Application): void {
  info("Configuring routes");
  app.use("/server/system", systemUserRouter);
  // app.use("/server/session", Session_Routes.get_router());
  // app.use("/server/password", Password_Routes.get_router());
  info("All Routes configured");
}

const app = express();
function configureApplicationLayer(): Application {
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
}

export { configureApplicationLayer };
