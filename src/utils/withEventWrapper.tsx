import React, { PropsWithChildren, SyntheticEvent } from "react";
import { EventSubject } from "./events";
import { TWithId } from "./types";

export const withEventWrapper = ({
  handlers,
  slug,
}: {
  handlers: string[];
  slug: string;
}) => {
  return function <T extends TWithId<{}>>(WrappedComponent: React.FC<T>) {
    const getHandlers = ({ slug, id }: { slug: string; id?: string }) =>
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

    const Component: React.FC<T> = (props: T) => {
      return (
        <WrappedComponent
          {...props}
          {...getHandlers({
            slug,
            id: props.id,
          })}
        />
      );
    };
    Component.displayName = slug;

    return Component;
  };
};
