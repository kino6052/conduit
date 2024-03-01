import React from "react";
import { Button } from "../Button";
import { Link } from "../Link";
import { Tags } from "../Tag/Tag";
import { Typography } from "../Typography";
import { UserInfo } from "../UserInfo";

import { EButtonVariant } from "../Button/types";
import styles from "./style.scss";
import { TPostProps } from "./types";
import { ETypographyType } from "../Typography/types";

export const Post: React.FC<TPostProps> = ({
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
        <UserInfo {...userInfoProps} />
        <Button
          id={id}
          text={String(likes)}
          variant={EButtonVariant.Secondary}
        />
      </div>
      <div className={styles.content}>
        <Link id={id} className={styles.link}>
          <Typography value={title} variant={ETypographyType.Heading2} />
          <Typography value={description} />
        </Link>
        <Tags tags={tags} />
      </div>
    </div>
  );
};
