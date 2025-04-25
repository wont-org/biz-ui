export const sleep = (timeout: number = 0) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, timeout);
  });
};
// 是否无效值
export const isInvalidValue = (val: any) => {
  return [null, undefined, NaN, ''].includes(val);
};
