import Chance from "chance";
import database from "../../database/index.js";
import { format } from "../../database/utils/index.js";

const chance = new Chance();

export default async (customer = {}) => {
  const firstName = customer.firstName || chance.first();
  const lastName = customer.lastName || chance.last();
  const email = customer.email || chance.email();
  const password = customer.password || chance.word({ length: 8 });
  const accountVerified = customer.accountVerified || false;

  const data = { firstName, lastName, email, password, accountVerified };

  const [user] = await database
    .knexOrm("users")
    .insert(format.toSnakeCase(data))
    .returning(["*"]);

  return user;
};
