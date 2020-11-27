import config from "./config/index.js";
import logger from "./src/infra/logger/index.js";
import database from "./src/infra/database/index.js";
import api from "./src/infra/api/index.js";

logger.info(`NODE_ENV=${config.env}`);

async function cleanUpRessources() {
  await api.close();
  await database.close();
}

function exitHandler(code, message) {
  return (error = null) => {
    logger.info(message);

    if (error && error instanceof Error) {
      logger.error(error);
    }

    cleanUpRessources()
      .then(() => {
        logger.info("Ressources have been cleaned up 🧹");
        return process.exit(code);
      })
      .catch((error) => {
        logger.error(error);
        process.exit(1);
      });
  };
}

// Manage Ctrl+C signal
process.on("SIGINT", exitHandler(0, "SIGINT signal received"));

// Manage terminate process signal (ex: kill)
process.on("SIGTERM", exitHandler(0, "SIGTERM signal received"));

// Manage uncaught exception
process.on(
  "uncaughtException",
  exitHandler(1, "uncaughtException signal received"),
);

// Manage unhandled promise rejection
process.on(
  "unhandledRejection",
  exitHandler(1, "unhandledRejection signal received"),
);

database
  .initialize()
  .then(() => api.initialize())
  .catch((error) => logger.error(error));
