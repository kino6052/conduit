export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[] // NOTE: when value is array
    : T[P] extends object
      ? T[P] extends (...args: any[]) => any
        ? T[P]
        : RecursivePartial<T[P]>
      : T[P]; // NOTE: otherwise
};

export type TWithClassName<T> = T & { className?: string };
export type TWithId<T> = T & { id: string; slug?: string };
