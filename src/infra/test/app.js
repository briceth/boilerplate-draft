import express from "express";

import errorHandler from "../api/middlewares/errorHandler.js";

export default (routes) => {
  const app = express();

  app.use(express.json());
  app.use("/api/v1", routes);

  app.all("*", (_, res) => {
    res.sendStatus(404);
  });

  app.use(errorHandler);

  return app;
};
