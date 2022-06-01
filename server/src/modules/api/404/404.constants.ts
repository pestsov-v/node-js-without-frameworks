export const PAGE_NOT_FOUND_MESSAGE = (host: string, path: string): string => {
  return `Такого маршрута: 'http://${host}/${path}' не существует`;
};
