import dotenv from "dotenv";
dotenv.config();

const appConfiguration = {
  APP_TYPE: process.env.APP_TYPE,
  APP_PORT: process.env.APP_PORT,
  APP_NAME: process.env.APP_NAME,
  MONGO_DB_DETAILS: {
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
    MONGO_TEST_DATABASE: process.env.MONGO_TEST_DATABASE,
    MONGO_UAT_DATABASE: process.env.MONGO_UAT_DATABASE,
    MONGO_PROD_DATABASE: process.env.MONGO_PROD_DATABASE,
  },
  SESSION_SECRET: process.env.SESSION_SECRET,
  PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS as string,
  PASSWORD_ENC_SECRET: process.env.PASSWORD_ENC_SECRET as string,
};

export default appConfiguration;
