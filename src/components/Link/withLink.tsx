import React from "react";
import { Link } from ".";
import { TWithId } from "../../utils/types";
import { ELinkConstant } from "./constants";

export function withLink(slug?: string) {
  return function<T>(WrappedComponent: React.FC<T>) {
    const Component: React.FC<TWithId<T>> = (props) => {
      return (
        <Link id={props.id} slug={slug || ELinkConstant.LinkSlug}>
          <WrappedComponent {...props} />
        </Link>
      );
    };

    return Component;
  };
}
