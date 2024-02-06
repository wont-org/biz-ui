export const sleep = (timeout: number = 0) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, timeout);
  });
};
