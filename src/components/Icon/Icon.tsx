import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  icon: string;
  variant: "with-icon" | "with-image";
  className: any;
  divClassName: any;
}

export const Icon = ({
  icon = "favorite",
  variant,
  className,
  divClassName,
}: Props): JSX.Element => {
  return (
    <div className={`icon ${variant} ${className}`}>
      <div className={`a ${divClassName}`}>
        {variant === "with-image" && <>a</>}

        {variant === "with-icon" && <>{icon}</>}
      </div>
    </div>
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  variant: PropTypes.oneOf(["with-icon", "with-image"]),
};
