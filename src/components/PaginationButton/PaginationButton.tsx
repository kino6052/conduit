import React from "react";
import "./style.css";

type TPaginationButtonProps = {
  value: string;
  variant: "selected" | "default";
  className: any;
  id?: string;
};

export const PaginationButton = ({
  value = "1",
  variant,
  className,
  ...props
}: TPaginationButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={`pagination-button variant-1-${variant} ${className}`}
    >
      <span className="element">{value}</span>
    </button>
  );
};
