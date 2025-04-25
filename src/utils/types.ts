export type ValueOfConst<T, K extends keyof T[keyof T]> = T[keyof T][K];
export type ValueOf<T> = T[keyof T];
export type ValueOfConstWithType<
  T,
  K extends keyof T[keyof T],
  R extends string | number = string,
> = T[keyof T][K] | (R & Record<never, never>);
