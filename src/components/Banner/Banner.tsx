import React from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { UserInfo } from "../UserInfo";
import { TUserInfo } from "../UserInfo/UserInfo";
import "./style.scss";

export interface TBannerProps {
  variant: "user-info" | "article" | "default";
  heading?: string;
  userInfo?: TUserInfo;
}

export const Banner: React.FC<TBannerProps> = ({
  variant,
  heading,
  userInfo,
}) => {
  return (
    <div className={`banner variant-${variant}`}>
      {variant === "default" && (
        <>
          <div className="text-wrapper-2">conduit</div>
          <p className="p">A place to share your knowledge.</p>
        </>
      )}

      {["article", "user-info"].includes(variant) && (
        <div className="frame">
          {variant === "user-info" && (
            <Icon className="instance-node" variant="with-image" />
          )}

          <Typography
            className={`${variant === "article" ? "class-3" : "class-4"}`}
            textClassName={`${variant === "article" ? "class" : "class-2"}`}
            value={heading}
            variant={variant === "article" ? "h-1" : "h-2"}
          />
          {variant === "user-info" && (
            <div className="button-wrapper">
              <Button
                className="instance-node-2"
                divClassName="button-instance"
                hasIcon={false}
                text="Follow John"
                variant="secondary-small"
              />
            </div>
          )}

          {variant === "article" && (
            <UserInfo className="instance-node-2" {...userInfo} />
          )}
        </div>
      )}
    </div>
  );
};
