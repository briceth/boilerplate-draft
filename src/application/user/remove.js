import { userRepository } from "../../infra/repositories/index.js";
import logger from "../../infra/logger/index.js";

export default async (id) => {
  try {
    return await userRepository.remove({ where: { id } });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
