import React from "react";
import { PaginationBar } from "../../components/PaginationBar";
import { Post } from "../../components/Article";
import { Sidebar } from "../../components/Sidebar";
import styles from "./style.scss";
import { THomePageProps } from "./types";
import { DefaultBanner } from "../../components/Banner";
import { Tabs } from "../../components/Tabs";

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
        <Tabs tabs={tabs} />
        <Sidebar {...sidebarProps} />
        {posts.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </div>
      <PaginationBar {...paginationBarProps} />
    </div>
  );
};
