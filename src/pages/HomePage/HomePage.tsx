import React from "react";
import { Post } from "../../components/Post";
import { Sidebar } from "../../components/Sidebar";
import { Tab } from "../../components/Tab/Tab";
import { PageWrapper } from "../PageWrapper";
import { TPageProps } from "../types";
import "./style.scss";

export const HomePage: React.FC<TPageProps> = ({
  bannerProps,
  sidebarProps,
  posts,
  tabs,
  paginationBarProps,
}) => {
  return (
    <PageWrapper
      bannerProps={bannerProps}
      paginationBarProps={paginationBarProps}
    >
      <div className="tabs">
        {tabs.map((tab) => (
          <Tab {...tab} />
        ))}
      </div>
      <Sidebar {...sidebarProps} />
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </PageWrapper>
  );
};
