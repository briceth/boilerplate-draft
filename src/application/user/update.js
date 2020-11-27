import { userRepository } from "../../infra/repositories/index.js";
import logger from "../../infra/logger/index.js";
import User from "../../domain/user.js";

export default async (id, body) => {
  try {
    const current = await userRepository.getOne({ where: { id } });

    User({ ...current, ...body });

    return await userRepository.update({ where: { id } }, body);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
