import React, { PropsWithChildren, useEffect, useState } from "react";

export type TWithLogic<T extends PropsWithChildren> = T & {
  slug: string;
  id?: string;
};

export function withLogic<
  T extends React.PropsWithChildren<Record<string, unknown>>,
>(onPropsChange: (cb: (props: T | undefined) => void) => void) {
  return function (WrappedComponent: React.FC<T>) {
    return () => {
      const [_state, setState] = useState<T | undefined>();

      useEffect(() => {
        onPropsChange(setState);
      }, []);

      return <WrappedComponent {..._state} />;
    };
  };
}
