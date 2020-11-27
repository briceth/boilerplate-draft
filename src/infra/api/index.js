import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import timeout from "connect-timeout";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import logger from "../logger/index.js";
import config from "../../../config/index.js";

import expressPino from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes.js";
import swaggerDef from "./swagger.js";

class Application {
  static initialize() {
    try {
      this.app = express();

      this.app
        .use(
          "/api-docs",
          swaggerUI.serve,
          swaggerUI.setup(swaggerJSDoc(swaggerDef), { explorer: true }),
        )
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(helmet())
        .use(compression())
        .use(expressPino())
        .use(
          cors({
            origin: config.api.corsOrigin,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
          }),
        )
        .use(timeout(config.api.timeout))
        .use("/api/v1", routes);

      this.app.get("/health-check", (_, res) => {
        res.sendStatus(200);
      });

      this.app.all("*", (_, res) => {
        res.sendStatus(404);
      });

      this.app.use(errorHandler);

      this.server = this.app.listen(config.api.port, () => {
        logger.info(
          `Server is listening on ${config.api.host}:${config.api.port} ✅`,
        );
        logger.info("Visit '/api-docs' to see routes API.");
      });
    } catch (error) {
      logger.error("Failed to instantiate Express app ❌", error);
      throw new Error(error);
    }
  }

  static async close() {
    if (!this.server) {
      logger.warn("Express app is not instantiate ⚠️");
      return;
    }

    this.server.close(() => {
      logger.info("Express server is closed.");
    });
  }
}

export default Application;
