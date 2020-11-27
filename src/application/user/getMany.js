import { userRepository } from "../../infra/repositories/index.js";
import logger from "../../infra/logger/index.js";

export default async (filters) => {
  try {
    return await userRepository.getMany({
      where: filters,
      select: ["id", "firstName", "lastName"],
    });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
