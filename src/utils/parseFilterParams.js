const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

const parseBoolean = (isFavorite) => {
  if (typeof isFavorite === 'boolean') return isFavorite;
  if (typeof isFavorite === 'string') {
    if (isFavorite.toLowerCase() === 'true') return true;
    if (isFavorite.toLowerCase() === 'false') return false;
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavorite } = query;
  const parsedType = parseContactType(contactType);
  const parsedIsFavorite = parseBoolean(isFavorite);

  return { contactType: parsedType, isFavorite: parsedIsFavorite };
};