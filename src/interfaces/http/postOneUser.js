import userApp from "../../application/user/index.js";

export default async ({ body }) => {
  try {
    const user = await userApp.create(body);

    return {
      statusCode: 200,
      body: user,
    };
  } catch (error) {
    // TODO: Error logging BOOM

    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
