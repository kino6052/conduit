import React from "react";
import { Banner } from "../../components/Banner";
import { Post } from "../../components/Post";
import { Sidebar } from "../../components/Sidebar";
import { Tab } from "../../components/Tab/Tab";
import { TPageProps } from "../types";
import "./style.scss";
import { PageWrapper } from "../PageWrapper";

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
