export const saveQueryLimitOnLS = (limit: number) => {
  localStorage.setItem("queryLimit", limit.toString());
};

export const getQueryLimitOnLS = () => {
  const lsLimit = localStorage.getItem("queryLimit");
  return lsLimit;
};
