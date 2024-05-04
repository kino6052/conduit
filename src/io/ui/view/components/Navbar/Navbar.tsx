import React from "react";
import { Link } from "../Link";
import { Tab } from "../Tab";
import styles from "./style.scss";
import { TNavbarProps } from "./types";

export const Navbar: React.FC<TNavbarProps> = ({ logo, tabs }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link onClick={logo.onClick}>
            <span className={styles.text}>conduit</span>
          </Link>
        </div>
        <div className={styles.navigation}>
          {tabs.map((tab) => (
            <Tab {...tab} key={tab.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
