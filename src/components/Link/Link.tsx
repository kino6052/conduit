import React, { PropsWithChildren } from "react";
import "./style.scss";
interface TLinkProps {
  href?: string;
}

export const Link: React.FC<PropsWithChildren<TLinkProps>> = ({
  href,
  children,
  ...props
}): JSX.Element => {
  return (
    <a className="link" href={href} {...props}>
      {children}
    </a>
  );
};
