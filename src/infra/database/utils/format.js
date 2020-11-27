export const toCamelCase = (obj) => {
  const replaced = {};

  for (const key in obj) {
    const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
      $1.toUpperCase().replace("_", ""),
    );

    replaced[camelCase] = obj[key];
  }

  return replaced;
};

export const toSnakeCase = (data) => {
  if (Array.isArray(data)) {
    return data.map((element) =>
      element.replace(/[A-Z]/g, ($1) => `_${$1.toLowerCase()}`),
    );
  } else {
    const replaced = {};

    for (const key in data) {
      const snakeCase = key.replace(/[A-Z]/g, ($1) => `_${$1.toLowerCase()}`);

      replaced[snakeCase] = data[key];
    }

    return replaced;
  }
};
