import React from "react";
import { ArticleBanner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { CommentInput } from "../../components/Input";
import { Tags } from "../../components/Tag";
import { Typography } from "../../components/Typography";
import { UserInfo } from "../../components/UserInfo";
import styles from "./styles.scss";
import { TArticlePageProps } from "./types";

export const ArticlePage: React.FC<TArticlePageProps> = ({
  bannerProps,
  userInfoProps,
  followButtonProps,
  favoriteButtonProps,
  commentBoxProps,
  content,
  tags,
  comments,
}) => {
  return (
    <div className={styles.wrapper}>
      <ArticleBanner {...bannerProps} />
      <div className={styles.content}>
        <Typography value={content} />
        <Tags tags={tags} />
        <div className={styles.comments}>
          <div className={styles.user}>
            {userInfoProps && <UserInfo {...userInfoProps} />}
            <div className={styles.buttons}>
              <Button {...followButtonProps} />
              <Button {...favoriteButtonProps} />
            </div>
          </div>
          <CommentInput
            {...commentBoxProps}
            inputProps={commentBoxProps.inputProps}
            buttonProps={commentBoxProps.buttonProps}
          />
          {comments.map(({ iconProps, inputProps }) => (
            <CommentInput
              iconProps={iconProps}
              inputProps={{
                ...inputProps,
                disabled: true,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
