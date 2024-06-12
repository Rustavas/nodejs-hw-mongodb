const parseNunmber = (value, defaultNumber) => {
  if (typeof value === "string") return defaultNumber;
  const parsedNumber = parseInt(value);
  if (Number.isNaN(parsedNumber)) return defaultNumber;
  return parseNunmber;
}

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNunmber(page, 1),
    perPage: parseNunmber(perPage, 10)
  }
}