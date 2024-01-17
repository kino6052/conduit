/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icon } from "../Icon";
import "./style.css";

export interface TTabProps {
  hasIcon: boolean;
  hasUnderline: boolean;
  text: string;
  variant: "menu" | "selected" | "unselected";
  className: any;
  divClassName: any;
  iconIcon: string;
}

export const Tab: React.FC<TTabProps> = ({
  hasIcon = true,
  hasUnderline = true,
  text = "Home",
  variant,
  className,
  divClassName,
  iconIcon = "favorite",
}) => {
  return (
    <div className={`tab ${variant} ${className}`}>
      {["selected", "unselected"].includes(variant) && (
        <div className="home">{text}</div>
      )}

      {variant === "menu" && (
        <>
          <>
            {hasIcon && (
              <Icon
                className="icon-instance"
                icon={iconIcon}
                variant="with-icon"
              />
            )}
          </>
          <div className={`text-wrapper ${divClassName}`}>{text}</div>
        </>
      )}
    </div>
  );
};

Tab.propTypes = {
  hasIcon: PropTypes.bool,
  hasUnderline: PropTypes.bool,
  text: PropTypes.string,
  variant: PropTypes.oneOf(["menu", "selected", "unselected"]),
  iconIcon: PropTypes.string,
};
