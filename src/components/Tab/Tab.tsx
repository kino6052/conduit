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
