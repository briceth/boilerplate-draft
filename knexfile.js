import config from "./config/index.js";

const knexConfig = {
  development: {
    connection: {
      user: config.db.username,
      host: config.db.host,
      database: config.db.database,
      password: config.db.password,
      port: config.db.port,
    },
    timeOut: config.db.timeOut,
    migrations: {
      directory: "./src/infra/database/migrations",
    },
    seeds: {
      directory: "./src/infra/database/seeds",
    },
  },
  test: {
    connection: {
      user: config.db.username,
      host: config.db.host,
      database: "boilerplate_test",
      password: config.db.password,
      port: config.db.port,
    },
    timeOut: config.db.timeOut,
    migrations: {
      directory: "./src/infra/database/migrations",
    },
    seeds: {},
  },
  staging: {},
  production: {},
};

export default Object.freeze({ client: "pg", ...knexConfig[config.env] });
