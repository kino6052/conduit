import React from "react";
import { Button } from "../Button";
import { Link } from "../Link";
import { Tags } from "../Tag";
import { Typography } from "../Typography";
import { UserInfo } from "../UserInfo";

import { EButtonVariant } from "../Button/types";
import styles from "./style.scss";
import { TArticleProps } from "./types";
import { ETypographyType } from "../Typography/types";
import { EArticleConstant } from "./constants";

export const Article: React.FC<TArticleProps> = ({
  title,
  description,
  userInfoProps,
  likes,
  tags = [],
  id,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <UserInfo id={id} {...userInfoProps} />
        <Button
          id={id}
          slug={EArticleConstant.LikeButtonSlug}
          text={String(likes)}
          variant={EButtonVariant.Secondary}
        />
      </div>
      <div className={styles.content}>
        <Link id={id} className={styles.link} slug={EArticleConstant.Slug}>
          <Typography value={title} variant={ETypographyType.Heading2} />
          <Typography value={description} />
        </Link>
        <Tags tags={tags} />
      </div>
    </div>
  );
};
