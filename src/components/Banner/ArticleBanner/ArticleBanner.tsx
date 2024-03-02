import React from "react";
import { Typography } from "../../Typography";
import { ETypographyType } from "../../Typography/types";
import styles from "./styles.scss";
import { TArticleBannerProps } from "./types";
import { UserInfo } from "../../UserInfo";
import { getClassNames } from "../../../utils/styles";

export const ArticleBanner: React.FC<TArticleBannerProps> = ({
  title,
  userInfoProps,
}) => {
  return (
    <div className={getClassNames(["wrapper", "article"], styles)}>
      <div className={styles.content}>
        <Typography
          value={title}
          variant={ETypographyType.Heading1}
          className={styles.white}
        />
        <UserInfo {...userInfoProps} />
      </div>
    </div>
  );
};
