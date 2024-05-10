import React from "react";
import { getClassNames } from "../../../../../../utils/styles";
import { Button } from "../../Button";
import { Typography } from "../../Typography";
import { ETypographyType } from "../../Typography/types";
import { UserInfo } from "../../UserInfo";
import styles from "./styles.scss";
import { TArticleBannerProps } from "./types";

export const ArticleBanner: React.FC<TArticleBannerProps> = ({
  title,
  userInfoProps,
  canEdit,
  editButtonProps,
  deleteButtonProps,
}) => {
  return (
    <div className={getClassNames(["wrapper", "article"], styles)}>
      <div className={styles.content}>
        <Typography
          value={title}
          variant={ETypographyType.Heading1}
          className={styles.white}
        />
        <div className={styles.user}>
          {userInfoProps && <UserInfo {...userInfoProps} />}
          {canEdit && (
            <div className={styles.buttons}>
              {editButtonProps && <Button {...editButtonProps} text="Edit" />}
              {deleteButtonProps && (
                <Button {...deleteButtonProps} text="Delete" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
