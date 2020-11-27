import { userRepository } from "../../infra/repositories/index.js";
import logger from "../../infra/logger/index.js";
import User from "../../domain/user.js";

export default async (body) => {
  try {
    const user = User(body);
    return await userRepository.create(user);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
