import { connect, disconnect } from "mongoose";
import appConfiguration from "../configuration/app.configuration";
import { info } from "../middleware";

function checkServerEnvironment(): string {
  const initialUrl = `mongodb+srv://${appConfiguration.MONGO_DB_DETAILS.MONGO_USERNAME}:${appConfiguration.MONGO_DB_DETAILS.MONGO_PASSWORD}@${appConfiguration.MONGO_DB_DETAILS.MONGO_HOST}/`;

  return initialUrl + `${appConfiguration.MONGO_DB_DETAILS.MONGO_DATABASE}`;
}

async function connectDatabase(): Promise<boolean> {
  info("Connecting to the Mongo Database");
  return await connect(checkServerEnvironment())
    .then(async (connection) => {
      info(`Database connected: ${connection.connection.host}`);
      return await Promise.resolve(true);
    })
    .catch(async (err) => {
      return await Promise.reject(new Error(err));
    });
}

async function disconnectDatabase(): Promise<void> {
  await disconnect();
  info("Database disconnected");
}

export { connectDatabase, disconnectDatabase, checkServerEnvironment };
