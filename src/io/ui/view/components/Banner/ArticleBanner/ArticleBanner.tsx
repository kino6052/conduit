import React from "react";
import { Typography } from "../../Typography";
import { Button } from "../../Button";
import { ETypographyType } from "../../Typography/types";
import styles from "./styles.scss";
import { TArticleBannerProps } from "./types";
import { UserInfo } from "../../UserInfo";
import { getClassNames } from "../../../../../../utils/styles";
import { EArticleBannerConstant } from "./constants";

export const ArticleBanner: React.FC<TArticleBannerProps> = ({
  title,
  userInfoProps,
  canEdit,
}) => {
  return (
    <div className={getClassNames(["wrapper", "article"], styles)}>
      <div className={styles.content}>
        <Typography
          value={title}
          variant={ETypographyType.Heading1}
          className={styles.white}
        />
        <div>
          {userInfoProps && (
            <UserInfo id={userInfoProps.username} {...userInfoProps} />
          )}
          {canEdit && (
            <Button text="Edit" id={EArticleBannerConstant.EditButtonId} />
          )}
          {canEdit && (
            <Button text="Delete" id={EArticleBannerConstant.RemoveButtonId} />
          )}
        </div>
      </div>
    </div>
  );
};
