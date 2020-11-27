import userApp from "../../application/user/index.js";

export default async ({ params, body }) => {
  try {
    const { userId } = params;
    const user = await userApp.update(userId, body);

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
