import React, { PropsWithChildren, SyntheticEvent } from "react";
import { EventSubject, Id } from "./events";

export type TWithId<T> = T & {
  slug: string;
  id?: string;
};

export const withEventWrapper = ({
  slug,
  handlers,
}: {
  slug?: string;
  handlers?: string[];
}) => {
  return function <T extends PropsWithChildren<{ id: string; slug: string }>>(
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

    return ({ id, ...props }: T) => (
      <WrappedComponent
        {...props}
        {...getHandlers({
          slug: slug || props.slug,
          id,
        })}
      />
    );
  };
};
