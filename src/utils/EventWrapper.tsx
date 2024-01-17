// @ts-nocheck

import React from "react";
import { Subject } from "rxjs";

export type Id = { id: string; uuid?: string };
export type IEvent = { type: string; id: Id; payload?: string };

export const EventSubject = new Subject<IEvent>();

export const EventWrapper: React.FC<
  React.PropsWithChildren<{
    id: { id: string; uuid?: string };
  }>
> = (props) => {
  const { children, id } = props;
  const childrenWithProps = React.Children.map<
    React.ReactNode,
    React.ReactNode
  >(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-ignore
        id: [Object(id).values].join("-"),
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          EventSubject.next({ type: "click", id });
        },
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          EventSubject.next({ type: "change", id, payload: e?.target?.value });
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            EventSubject.next({ type: "enter", id, payload: e?.target?.value });
          }
        },
        // NOTE: This should be extensible for various handlers
      });
    }
    return child;
  });
  return <>{childrenWithProps}</>;
};
