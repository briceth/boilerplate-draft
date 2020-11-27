import userApp from "../../application/user/index.js";

export default async ({ query }) => {
  try {
    // TODO format query
    console.log("query: ", query);

    const users = await userApp.getMany(query);

    return {
      statusCode: 200,
      body: users,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
