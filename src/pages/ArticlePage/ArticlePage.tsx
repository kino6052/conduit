import React from "react";
import styles from "./styles.scss";
import { ArticleBanner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { CommentInput } from "../../components/Input";
import { UserInfo } from "../../components/UserInfo";
import { TArticlePageProps } from "./types";
import { Typography } from "../../components/Typography";
import { Tags } from "../../components/Tag/Tag";

export const ArticlePage: React.FC<TArticlePageProps> = ({
  bannerProps,
  userInfoProps,
  followButtonProps,
  favoriteButtonProps,
  commentBoxProps,
  content,
  tags,
}) => {
  return (
    <div className={styles.wrapper}>
      <ArticleBanner {...bannerProps} />
      <div className={styles.content}>
        <Typography value={content} />
        <Tags tags={tags} />
        <div className={styles.comment}>
          <div className={styles.user}>
            <UserInfo {...userInfoProps} />
            <Button {...followButtonProps} />
            <Button {...favoriteButtonProps} />
          </div>
          <CommentInput {...commentBoxProps} />
        </div>
      </div>
    </div>
  );
};
