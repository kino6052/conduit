import React from "react";
import { Button } from "../Button";
import { Link } from "../Link";
import { Tags } from "../Tag";
import { Typography } from "../Typography";
import { UserInfo } from "../UserInfo";

import { EButtonVariant } from "../Button/types";
import { ETypographyType } from "../Typography/types";
import styles from "./style.scss";
import { TArticleProps } from "./types";

export const Article: React.FC<TArticleProps> = ({
  title,
  description,
  userInfoProps,
  likeButtonProps,
  tags = [],
  linkProps,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        {userInfoProps && <UserInfo {...userInfoProps} />}
        <Button {...likeButtonProps} variant={EButtonVariant.Secondary} />
      </div>
      <div className={styles.content}>
        <Link {...linkProps} className={styles.link}>
          <Typography value={title} variant={ETypographyType.Heading2} />
          <Typography value={description} />
        </Link>
        <Tags tags={tags} />
      </div>
    </div>
  );
};
