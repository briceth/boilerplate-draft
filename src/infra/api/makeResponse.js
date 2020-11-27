import logger from "../logger/index.js";

export default (controller) => {
  console.log("controller: ", controller);
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    console.log("httpRequest: ", httpRequest);
    return controller(httpRequest)
      .then((httpResponse) => {
        res.set(
          httpResponse.headers || {
            "Content-Type": "application/json",
          },
        );
        return res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((error) => {
        logger.error("[makeResponse]:", error);
      });
  };
};
