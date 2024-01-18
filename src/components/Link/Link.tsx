import React, { PropsWithChildren } from "react";
// import "./style.css";

interface TLinkProps {
  href?: string;
}

export const Link: React.FC<PropsWithChildren<TLinkProps>> = ({
  href,
  children,
  ...props
}): JSX.Element => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};
