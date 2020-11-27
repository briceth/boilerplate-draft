import userApp from "../../application/user/index.js";

export default async ({ params }) => {
  try {
    const user = await userApp.getOne(params.userId);

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
