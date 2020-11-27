import knex from "knex";
import knexfile from "../../../knexfile.js";
import logger from "../logger/index.js";
import { format } from "./utils/index.js";

class Database {
  static knexOrm;

  static async initialize() {
    try {
      this.knexOrm = knex({
        client: knexfile.client,
        connection: knexfile.connection,
        migrations: knexfile.migrations,
        seeds: knexfile.seeds,
        acquireConnectionTimeout: knexfile.timeOut,
        postProcessResponse: this.postProcessResponse,
        // wrapIdentifier: (value, origImpl, queryContext) => {
        //   console.log("queryContext: ", queryContext);
        //   console.log("origImpl: ", origImpl);
        //   console.log("value: ", value);
        // },
        error(message, ...args) {
          logger.error("error message from knex: ", message, ...args);
        },
        deprecate(message, ...args) {
          logger.warn("deprecate message from knex: ", message, ...args);
        },
      });

      this.initializePlugins();

      await this.knexOrm.raw("SELECT 1 + 1;"); // To ensure this is well connected
      logger.info("Connected to PostgreSQL with Knex ✅");
    } catch (error) {
      logger.error("Failed to connect on PostgreSQL ❌", error);
      throw new Error(error);
    }
  }

  static initializePlugins() {
    knex.QueryBuilder.extend("paginate", async function (args) {
      const { itemsPerPage, orderBy = "created_at" } = args;
      let { currentPage } = args;

      if (currentPage < 1) currentPage = 1;

      const offset = (currentPage - 1) * itemsPerPage;

      return this.offset(offset)
        .limit(itemsPerPage)
        .orderBy(orderBy)
        .then((data) => {
          return {
            data,
            pagination: {
              currentPage,
            },
          };
        });
    });
  }

  // TODO: add special case for raw SQL results
  static postProcessResponse(result) {
    if (Array.isArray(result)) {
      return result.map((row) => format.toCamelCase(row));
    }

    return format.toCamelCase(result);
  }

  static async close() {
    if (!this.knexOrm) {
      logger.warn("PostgreSQL is not instantiate ⚠️");
      return;
    }

    this.knexOrm.destroy(() => {
      logger.info("PostgreSQL connection is closed 🚧");
      return Promise.resolve();
    });
  }
}

export default Database;
