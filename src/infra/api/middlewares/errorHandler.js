import logger from "../../logger/index.js";

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  const status = error.status || 500;

  // TODO determine if this is an operational error: https://nodejs.org/api/errors.html
  // TODO send mail
  logger.error("Error handler middleware:", error);

  res.status(status).json({ error: error.message });
};
