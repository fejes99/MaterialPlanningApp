export const convertFullDate = (date: Date) => {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const convertShortDate = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${month}/${year}`;
};
