import React, { PropsWithChildren, SyntheticEvent } from "react";
import { EventSubject } from "./events";

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
  return function <T extends PropsWithChildren<TWithId<{}>>>(
    WrappedComponent: React.FC<T>,
  ) {
    const getHandlers = ({ slug, id }: TWithId<{}>) =>
      handlers
        ?.filter((name) => /^on/.test(name))
        .reduce(
          (acc, name) => ({
            ...acc,
            [name]: (e: SyntheticEvent) =>
              EventSubject.next({
                slug,
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
