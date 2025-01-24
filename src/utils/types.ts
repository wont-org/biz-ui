export type ValueOfConst<T, K extends keyof T[keyof T]> = T[keyof T][K];
export type ValueOf<T> = T[keyof T];
