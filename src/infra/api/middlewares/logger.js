import expressPino from "express-pino-logger";
import logger from "../../logger/index.js";

export default () => {
  return expressPino({
    logger,
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        user: req.raw.user,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  });
};
