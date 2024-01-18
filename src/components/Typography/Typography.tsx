import React from "react";
import "./style.css";

interface Props {
  value: string;
  variant: "regular" | "regular-bold" | "regular-grey" | "h-1" | "h-2";
  className: any;
  textClassName: any;
}

export const Typography = ({
  value = "This is text",
  variant,
  className,
  textClassName,
}: Props): JSX.Element => {
  return (
    <div className={`heading ${className}`}>
      <div className={`text ${variant} ${textClassName}`}>{value}</div>
    </div>
  );
};
