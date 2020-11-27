/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/no-hooks */
import config from "../../../config/index.js";
import database from "../database/index.js";
import logger from "../logger/index.js";

logger.info(`NODE_ENV=${config.env}`);

beforeAll(async () => {
  logger.info("Initialize database for test");
  await database.initialize().catch((error) => logger.error(error));
});

beforeEach(() => {});

afterEach(async () => {
  const tables = await database
    .knexOrm("pg_catalog.pg_tables")
    .select("tablename")
    .where({ schemaname: "public" })
    .whereNotIn("tablename", ["knex_migrations", "knex_migrations_lock"]);

  await database.knexOrm.table(tables.map((table) => table.tablename)).del();
});

afterAll(async () => {
  logger.info("Close database after test");
  await database.close().catch((error) => logger.error(error));
});
