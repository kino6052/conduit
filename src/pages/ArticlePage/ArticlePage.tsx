import React from "react";
import { Banner } from "../../components/Banner";
import { PaginationBar } from '../../components/PaginationBar';
import { Post } from "../../components/Post";
import { Sidebar } from "../../components/Sidebar";
import { Tab } from "../../components/Tab/Tab";
import { TPageProps } from "../types";
import "./style.scss";

export const ArticlePage: React.FC<TPageProps> = ({
  bannerProps: banner,
  sidebarProps,
  posts,
  tabs,
  paginationBarProps
}) => {
  return (
    <div className="home-page">
      <Banner {...banner} />
      <div className="page-container">
      <div className="row">
          <div className="tabs">
            {tabs.map((tab) => (
              <Tab {...tab} />
            ))}
          </div>
          <Sidebar {...sidebarProps} />
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};
