import React from "react";
import { Link } from ".";
import { TWithClickHandler, TWithId } from "../../../../../utils/types";

export function withLink<T>(WrappedComponent: React.FC<T>) {
  const Component: React.FC<TWithClickHandler<T>> = (props) => {
    return (
      <Link onClick={props.onClick}>
        <WrappedComponent {...props} />
      </Link>
    );
  };

  return Component;
}
