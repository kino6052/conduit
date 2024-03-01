import React from "react";
import { PageWrapper } from "../PageWrapper";
import { TPageProps } from "../types";
// import "./style.scss";
import { Banner } from "../../components/Banner";
import { EBannerVariant } from "../../components/Banner/types";
import { UserInfo } from "../../components/UserInfo";
import { Button } from "../../components/Button";
import { TArticlePageProps } from "./types";

export const ArticlePage: React.FC<TArticlePageProps> = ({
  bannerProps,
  userInfoProps,
  followButtonProps,
  favoriteButtonProps,
  commentBoxProps,
}) => {
  return (
    <div className="wrapper">
      <Banner {...bannerProps} variant={EBannerVariant.Article} />
      <div className="content"></div>
      <div className="comment-section">
        <div className="user-info">
          <UserInfo {...userInfoProps} />
          <Button {...followButtonProps} />
          <Button {...favoriteButtonProps} />
        </div>
        <CommentBox {...commentBoxProps} />
      </div>
    </div>
  );
};
