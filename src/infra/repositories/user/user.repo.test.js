import UserRepo from "./user.repo.js";
import factory from "../../test/factory/index.js";

/**
 * AAA pattern (Arrange, Act & Assert) https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/testingandquality/aaa.md
 * Include 6 parts in each test
 * The last it() is the one that doesn't throw an error
 */

describe.skip("user repository", () => {
  describe("[getMany]", () => {
    it("when [filters] and [attributes] are valid, should return a list of users with pagination", async () => {
      expect.assertions(2);

      await factory.createUser();

      const parameters = { filters: {}, attributes: [] };

      const users = await UserRepo.getMany(parameters);

      expect(users.data).toHaveLength(1);
      expect(users.pagination.currentPage).toStrictEqual(1);
    });
  });
  describe("[getOne]", () => {
    it("when [filters] and [attributes] are valid, should return an user", async () => {
      expect.assertions(1);

      const fakeUser = await factory.createUser();

      const parameters = {
        filters: {
          id: fakeUser.id,
        },
        attributes: ["firstName"],
      };

      const user = await UserRepo.getOne(parameters);

      expect(user.firstName).toStrictEqual(fakeUser.firstName);
    });
  });
  describe("[create]", () => {
    it("when [body] are valid, should return an user", async () => {
      expect.assertions(8);

      const body = {
        firstName: "Bruce",
        lastName: "Wayne",
        email: "bruce.wayne@gmail.com",
        password: "batman",
      };

      const user = await UserRepo.create(body);

      expect(typeof user.id).toBe("number");
      expect(typeof user.updatedAt).toBe("object");
      expect(typeof user.createdAt).toBe("object");
      expect(user.accountVerified).toStrictEqual(false);
      expect(user.firstName).toStrictEqual(body.firstName);
      expect(user.lastName).toStrictEqual(body.lastName);
      expect(user.email).toStrictEqual(body.email);
      expect(user.password).toStrictEqual(body.password);
    });
  });
  describe("[update]", () => {
    it("when [body] are valid, should return an user id", async () => {
      expect.assertions(7);

      const fakeUser = await factory.createUser();

      const newData = {
        firstName: "Patrick",
        lastName: "Swayze",
      };

      const updatedUser = await UserRepo.update({
        filters: {
          id: fakeUser.id,
        },
        body: newData,
      });

      expect(updatedUser).toMatchObject({ id: fakeUser.id });
      expect(typeof updatedUser.id).toBe("number");

      const getUpdatedUser = await UserRepo.getOne({
        filters: {
          id: fakeUser.id,
        },
      });

      expect(getUpdatedUser.firstName).toStrictEqual(newData.firstName);
      expect(getUpdatedUser.lastName).toStrictEqual(newData.lastName);
      expect(getUpdatedUser.accountVerified).toStrictEqual(false);
      expect(getUpdatedUser.email).toStrictEqual(fakeUser.email);
      expect(getUpdatedUser.password).toStrictEqual(fakeUser.password);
    });
  });

  describe("[remove]", () => {
    it("when [filters] are valid, should return an user id", async () => {
      expect.assertions(3);

      const fakeUser = await factory.createUser();

      const parameters = {
        filters: {
          id: fakeUser.id,
        },
      };

      const removedUser = await UserRepo.remove(parameters);

      expect(removedUser).toMatchObject({ id: fakeUser.id });
      expect(typeof removedUser.id).toBe("number");

      const getRemovedUser = await UserRepo.getOne(parameters);

      expect(getRemovedUser).toBeNull();
    });
  });
});
