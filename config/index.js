import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  api: {
    host: process.env.API__HOST,
    port: process.env.API__PORT,
    timeout: process.env.API__TIMEOUT,
    corsOrigin: process.env.API__CORS_ORIGIN,
  },
  db: {
    host: process.env.DB__HOST,
    port: process.env.DB__PORT,
    database: process.env.DB__NAME,
    username: process.env.DB__USERNAME,
    password: process.env.DB__PASSWORD,
    timeOut: process.env.DB__TIME_OUT,
  },
};

export default Object.freeze(config);
