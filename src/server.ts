import { configureApplicationLayer } from "./app";
import appConfiguration from "./configuration/app.configuration";
import { connectDatabase, disconnectDatabase } from "./connection";
import {
  configureLogger,
  info,
  logError,
} from "./middleware/logger.middleware";

function startServer(): void {
  configureLogger();
  const app = configureApplicationLayer();
  connectDatabase()
    .then(() => {
      app.listen(appConfiguration.APP_PORT, () => {
        info(
          `${appConfiguration.APP_NAME} is running on port ${appConfiguration.APP_PORT}`
        );
      });
    })
    .catch((err) => {
      logError(`Could not start the server: ${err}`);
    });

  /**
   * This will handle the server stopping by ctrl + c by disconnecting
   * the database and cleaning the process queue
   */
  process.on("SIGINT", function () {
    disconnectDatabase()
      .then(() => {
        info("Shutting down the server from ctrl + c");
        process.exit();
      })
      .catch((err) => {
        logError(`Error shutting down the server: ${err}`);
      });
  });
}

startServer();
