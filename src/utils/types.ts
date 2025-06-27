export type ValueOfConst<T, K extends keyof T[keyof T]> = T[keyof T][K];
export type ValueOfConstWithType<
  T,
  K extends keyof T[keyof T],
  R extends string | number = string,
> = T[keyof T][K] | (R & Record<never, never>);
export type ValueOf<T> = T[keyof T];
export type ValueOfWithType<T, R extends string | number = string> =
  | T[keyof T]
  | (R & Record<never, never>);

export type KeyOf<T> = keyof T;
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
