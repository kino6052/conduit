import React, { PropsWithChildren, SyntheticEvent } from "react";
import { EventSubject } from "./events";

export const withEventWrapper = ({
  handlers,
  slug
}: {
  handlers: string[],
  slug: string
}) => {
  return function <T extends PropsWithChildren<{ id?: string, slug?: string }>>(
    WrappedComponent: React.FC<T>,
  ) {
    const getHandlers = ({ slug, id }: { slug: string, id?: string }) =>
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
                event: e.nativeEvent,
              }),
          }),
          {},
        );

    return ({ id, ...props }: T) => (
      <WrappedComponent
        {...props}
        {...getHandlers({
          slug,
          id,
        })}
      />
    );
  };
};
