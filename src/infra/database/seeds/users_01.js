export function seed(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          first_name: "first_name_1",
          last_name: "last_name",
          email: "email@com",
          password: "password",
        },
        {
          id: 2,
          first_name: "first_name_2",
          last_name: "last_name",
          email: "email@com",
          password: "password",
        },
        {
          id: 3,
          first_name: "first_name_3",
          last_name: "last_name",
          email: "email@com",
          password: "password",
        },
      ]);
    });
}
