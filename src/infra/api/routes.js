import express from "express";
import http from "../../interfaces/http/index.js";
import makeResponse from "./makeResponse.js";

const router = express.Router();

/**
 * @swagger
 * /users/:userId:
 *   get:
 *     description: get a single user
 *     parameters:
 *     - name: userId
 *       in: path
 *       description: ID of user that needs to be returned
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       '200':
 *         description: return a single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/User"
 */
router.get("/users/:userId", makeResponse(http.getOneUser));

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     parameters:
 *     - name: body
 *       in: body
 *       description: firstname and lastname
 *       required: true
 *       schema:
 *         $ref: "#/definitions/User"
 *     responses:
 *       '200':
 *         description: return a single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/User"
 */
router.post("/users", makeResponse(http.postOneUser));

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get many users
 *     parameters:
 *     - name: tags
 *       in: query
 *       description: Tags to filter by
 *       required: true
 *       type: array
 *       items:
 *          type: string
 *       collectionFormat: multi
 *     responses:
 *       '200':
 *         description: return many users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/definitions/User"
 */
router.get("/users", makeResponse(http.getManyUser));

/**
 * @swagger
 * /users/:userId:
 *   delete:
 *     description: Remove a single user
 *     parameters:
 *     - name: userId
 *       in: path
 *       description: ID of user that needs to be returned
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       '200':
 *         description: Return success true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success: boolean
 */
router.delete("/users/:userId", makeResponse(http.removeUser));

/**
 * @swagger
 * /users/:userId:
 *   put:
 *     description: Remove a single user
 *     parameters:
 *     - name: userId
 *       in: path
 *       description: ID of user that needs to be returned
 *       required: true
 *       schema:
 *         type: string
 *     - name: body
 *       in: body
 *       description: firstname and lastname
 *       required: true
 *       schema:
 *         $ref: "#/definitions/User"
 *     responses:
 *       '200':
 *         description: return a single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/User"
 */
router.put("/users/:userId", makeResponse(http.updateUser));

export default router;
