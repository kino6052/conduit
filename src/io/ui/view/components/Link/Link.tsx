import React, { PropsWithChildren } from "react";
import { getClassNames } from "../../../../../utils/styles";
import styles from "./style.scss";
import { TLinkProps } from "./types";

export const Link: React.FC<PropsWithChildren<TLinkProps>> = ({
  href,
  children,
  className,
  ...props
}) => {
  return (
    <a
      {...props}
      tabIndex={0}
      href={href}
      className={getClassNames(["link", className], styles)}
    >
      {children}
    </a>
  );
};
