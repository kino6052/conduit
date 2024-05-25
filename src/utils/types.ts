import React from "react";

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[] // NOTE: when value is array
    : T[P] extends object
      ? T[P] extends (...args: any[]) => any
        ? T[P]
        : RecursivePartial<T[P]>
      : T[P]; // NOTE: otherwise
};

export type TWithChangeHandler<T> = T & {
  onChange: (event: {
    target: {
      value: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }) => Promise<void>;
};
export type TWithClickHandler<T> = T & { onClick: () => Promise<void> };
export type TWithClassName<T> = T & { className?: string };
export type TWithId<T> = T & { id: string; slug?: string };
export type TIdMap<T> = { [id: string]: T };
export type TWithOnMountHandler<T> = T & { onMount: () => Promise<void> };

export type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> &
  TOverridden;
