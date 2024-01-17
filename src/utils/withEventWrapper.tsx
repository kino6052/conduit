import React, { PropsWithChildren, SyntheticEvent } from "react";
import { EventSubject, Id } from "./events";

export const withEventWrapper = (handlers?: string[]) => {
  return function <T extends PropsWithChildren<{ id: Id }>>(
    WrappedComponent: React.FC<T>,
  ) {
    const getHandlers = (id: Id) =>
      handlers
        ?.filter((name) => /^on/.test(name))
        .reduce(
          (acc, name) => ({
            ...acc,
            [name]: (e: SyntheticEvent) =>
              EventSubject.next({
                id,
                type: name,
                payload: JSON.stringify(e.nativeEvent),
              }),
          }),
          {},
        );

    return (props: T) => (
      <WrappedComponent {...props} {...getHandlers(props.id)} />
    );
  };
};
