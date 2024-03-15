import React from "react";
import { EPage } from "../../types";
import { Tab } from "../Tab";
import { ETabVariant } from "../Tab/types";
import styles from "./style.scss";
import { TNavbarProps } from "./types";

export const Navbar: React.FC<TNavbarProps> = ({ username }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.text}>conduit</span>
        </div>
        <div className={styles.navigation}>
          <Tab id={EPage.Home} text="Home" variant={ETabVariant.Menu} />
          <Tab
            id={EPage.NewArticle}
            icon="edit"
            text="New Post"
            variant={ETabVariant.Menu}
          />
          <Tab
            id={EPage.Settings}
            icon="settings"
            text="Settings"
            variant={ETabVariant.Menu}
          />
          <Tab
            id={EPage.Profile}
            icon="person"
            text={username}
            variant={ETabVariant.Menu}
          />
        </div>
      </div>
    </div>
  );
};
