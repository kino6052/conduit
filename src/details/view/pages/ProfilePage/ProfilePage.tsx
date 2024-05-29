import React from "react";
import { ProfileBanner } from "../../components/Banner";
import { PaginationBar } from "../../components/PaginationBar";
import { Post } from "../../components/Article";
import { Sidebar } from "../../components/Sidebar";
import { Tab } from "../../components/Tab/Tab";
import styles from "./style.scss";
import { TProfilePageProps } from "./types";
import { Loader } from "../../components/Loader";

export const ProfilePage: React.FC<TProfilePageProps> = ({
  bannerProps,
  sidebarProps,
  posts,
  tabs,
  paginationBarProps,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper}>
      <ProfileBanner {...bannerProps} />
      <div className={styles.content}>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {tabs.length > 0 && (
              <div className={styles.tabs}>
                {tabs.map((tab) => (
                  <Tab {...tab} key={tab.id} />
                ))}
              </div>
            )}
            {sidebarProps.tags.length > 0 && <Sidebar {...sidebarProps} />}
            {posts.map((post) => (
              <Post {...post} />
            ))}
          </>
        )}
      </div>
      <PaginationBar {...paginationBarProps} />
    </div>
  );
};
