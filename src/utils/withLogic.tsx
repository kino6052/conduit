import React, { PropsWithChildren, useEffect, useState } from "react";
import { EventSubject, IEvent } from "./events";

export type TWithLogic<T extends PropsWithChildren> = T & {
  slug: string;
  id?: string;
};

export function withLogic<
  T extends React.PropsWithChildren<Record<string, unknown>>,
>(update: (event: IEvent, state: T) => Promise<T>) {
  return function (WrappedComponent: React.FC<T>) {
    return (props: T) => {
      const [_state, setState] = useState<T>(props);
      
      useEffect(() => {
        const subscription = EventSubject.subscribe((event) => {
          update(event, _state).then((newState) => {
            setState(newState);
          });
        });

        return () => subscription.unsubscribe();
      }, [_state]);

      return <WrappedComponent {..._state} />;
    };
  };
}
