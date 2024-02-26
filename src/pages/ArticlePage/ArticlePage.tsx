import React from "react";
import { PageWrapper } from "../PageWrapper";
import { TPageProps } from "../types";
import "./style.scss";

export const ArticlePage: React.FC<TPageProps> = ({
  bannerProps,
  sidebarProps,
  posts,
  tabs,
}) => {
  return (
    <PageWrapper bannerProps={bannerProps}>
      <p>Article</p>
    </PageWrapper>
  );
};
