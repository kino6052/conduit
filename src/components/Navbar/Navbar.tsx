import React from "react";
import { Tab } from "../Tab";
import styles from "./style.scss";
import { TNavbarProps } from "./types";
import { Link } from "../Link";
import { ENavbarConstant } from "./constants";

export const Navbar: React.FC<TNavbarProps> = ({ tabs }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link id={ENavbarConstant.LogoId}>
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
