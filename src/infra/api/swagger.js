export default {
  swaggerDefinition: {
    info: {
      title: "A Swagger title",
      version: "1.0.0",
      description: "Boilerplate API",
    },
    definitions: {
      User: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
        },
      },
    },
  },
  apis: ["src/infra/api/routes.js"],
};
