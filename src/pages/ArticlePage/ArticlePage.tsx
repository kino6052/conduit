import React from "react";
import styles from "./styles.scss";
import { ArticleBanner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { CommentInput } from "../../components/Input";
import { UserInfo } from "../../components/UserInfo";
import { TArticlePageProps } from "./types";
import { Typography } from "../../components/Typography";
import { Tags } from "../../components/Tag";
import { EArticlePageConstants } from "./constants";

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
            <UserInfo {...userInfoProps} />
            <Button {...followButtonProps} />
            <Button {...favoriteButtonProps} />
          </div>
          <CommentInput
            {...commentBoxProps}
            inputProps={{
              ...commentBoxProps.inputProps,
              id: EArticlePageConstants.InputId,
            }}
            buttonProps={
              commentBoxProps.buttonProps && {
                ...commentBoxProps.buttonProps,
                id: EArticlePageConstants.SubmitButtonId,
              }
            }
          />
          {comments.map(({ iconProps, inputProps, id }) => (
            <CommentInput
              id={id}
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
