export default ({ firstName, lastName, email, password }) => {
  if (!firstName) {
    throw new Error("User must have a firstname.");
  }

  if (!lastName) {
    throw new Error("User must have a lastname.");
  }

  if (!email) {
    throw new Error("User must have an email.");
  }

  if (!password) {
    throw new Error("User must have a password.");
  }

  return Object.freeze({
    firstName,
    lastName,
    email,
    password,
  });
};
