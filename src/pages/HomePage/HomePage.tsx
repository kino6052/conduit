import React from "react";
import { PaginationBar } from "../../components/PaginationBar";
import { Post } from "../../components/Article";
import { Sidebar } from "../../components/Sidebar";
import { Tab } from "../../components/Tab/Tab";
import styles from "./style.scss";
import { THomePageProps } from "./types";
import { DefaultBanner } from "../../components/Banner";

export const HomePage: React.FC<THomePageProps> = ({
  sidebarProps,
  posts,
  tabs,
  paginationBarProps,
}) => {
  return (
    <div className={styles.wrapper}>
      <DefaultBanner />
      <div className={styles.content}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <Tab {...tab} key={tab.id} />
          ))}
        </div>
        <Sidebar {...sidebarProps} />
        {posts.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </div>
      <PaginationBar {...paginationBarProps} />
    </div>
  );
};
