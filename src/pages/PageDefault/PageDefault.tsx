import React from "react";
import { Banner } from "../../components/Banner";
import { TBannerProps } from "../../components/Banner/Banner";
import { Navbar } from "../../components/Navbar";
import { PaginationBar } from "../../components/PaginationBar";
import { Post } from "../../components/Post";
import { TPostProps } from "../../components/Post/Post";
import { Sidebar } from "../../components/Sidebar";
import { TSidebarProps } from "../../components/Sidebar/types";
import { Tab, TTabProps } from "../../components/Tab/Tab";
import "./style.css";

type TPageDefault = {
  username: "eni9mu5";
  banner: TBannerProps;
  sidebarProps: TSidebarProps;
  posts: TPostProps[];
  tabs: TTabProps[];
};

export const DefaultState: TPageDefault = {
  username: "eni9mu5",
  banner: {
    variant: "article",
    heading: "Article text",
    userInfo: {
      date: "01 April 1990",
      username: "Test",
    },
  },
  sidebarProps: {
    title: "Popular tags",
    tags: ["one", "something", "chinese", "english", "french"],
  },
  posts: [
    {
      date: "01 January 2024",
      username: "Jane Lobster",
      description: "A good article, a really really good one",
      likes: 24,
      tags: ["first", "second", "third"],
      title: "A good thing",
    },
    {
      date: "01 January 2024",
      username: "Jane Lobster",
      description: "A good article, a really really good one",
      likes: 24,
      tags: ["first", "second", "third"],
      title: "A good thing",
    },
  ],
  tabs: [
    { text: "Your feed", variant: "selected" },
    { text: "Your feed", variant: "unselected", hasUnderline: false },
  ],
};

export const PageDefault: React.FC<TPageDefault> = ({
  username,
  banner,
  sidebarProps,
  posts,
  tabs,
} = DefaultState) => {
  return (
    <div className="page-default">
      <Navbar className="design-component-instance-node-3" username="eni9mu5" />
      <div className="home-page">
        <Banner className="design-component-instance-node-3" {...banner} />
        <div className="page-container">
          <div className="row">
            <div className="left">
              <div className="tabs">
                {tabs.map((tab) => (
                  <Tab {...tab} />
                ))}
              </div>
              <Sidebar {...sidebarProps} />
              {posts.map((post) => (
                <Post {...post} />
              ))}
              <PaginationBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
