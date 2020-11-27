import database from "../../database/index.js";
import { format, object } from "../../database/utils/index.js";

/**
 * Repositories must be ORM agnostic
 *
 * @warning returning("id") does not seems to work, use returning(["id"]) instead
 *
 * @example database.knexOrm.select("*").from("users")
 * @example database.knexOrm("users").select("*")
 */

/**
 * @typedef {Object} Filter
 * @property {{ [key:string]: Object }}
 */

/**
 * @typedef {string[]} Attribute
 */

/**
 * @typedef {Object} Pagination
 * @property {number} itemsPerPage
 * @property {number} currentPage
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} password
 * @property {string} account_verified
 * @property {string} created_at
 * @property {string} updated_at
 */

class UserRepo {
  /**
   * @param {{ filters:Filter, attributes:Attribute, pagination:Pagination }} params
   * @returns {Promise<User[]>}
   */
  static async getMany({
    filters = {},
    attributes = [],
    pagination = {
      itemsPerPage: 10,
      currentPage: 1,
    },
  }) {
    const queryBuilder = database.knexOrm("users");

    if (!object.isArray(attributes))
      throw new Error("[attributes] must be an array ❌");

    if (!object.isArrayEmpty(attributes)) {
      queryBuilder.select(format.toSnakeCase(attributes));
    } else {
      queryBuilder.select(["*"]);
    }

    if (!object.isObjectEmpty(filters)) {
      queryBuilder.where(filters);
    }

    if (!pagination) throw new Error("[pagination] must be an provide ❌");

    return queryBuilder.paginate(pagination);
  }

  /**
   * @param {{ filters:Filter, attributes:Attribute }} params
   * @returns {Promise<User>}
   */
  static async getOne({ filters, attributes = ["*"] }) {
    const [user] = await database
      .knexOrm("users")
      .select(format.toSnakeCase(attributes))
      .where(filters);

    return user || null;
  }

  /**
   * @param {body} body
   * @returns {Promise<User>}
   */
  static async create(body) {
    const { firstName, lastName, email, password } = body;

    const [user] = await database
      .knexOrm("users")
      .insert(format.toSnakeCase({ firstName, lastName, email, password }))
      .returning(["*"]);

    return user || null;
  }

  /**
   * @param {{ filters:Filter, body:Object }} params
   * @returns {Promise<User>}
   */
  static async update({ filters, body }) {
    const { firstName, lastName } = body;

    const [user] = await database
      .knexOrm("users")
      .update(format.toSnakeCase({ firstName, lastName }))
      .returning(["id"])
      .where("id", filters.id);

    return user || null;
  }

  /**
   * @param {{ filters:Filter }} params
   * @returns {Promise<{ id:number }>}
   */
  static async remove({ filters }) {
    const [user] = await database
      .knexOrm("users")
      .del()
      .where("id", filters.id)
      .returning(["id"]);

    return user || null;
  }
}

export default UserRepo;
