export const wait = (interval: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(undefined);
    }, interval);
  });
};
