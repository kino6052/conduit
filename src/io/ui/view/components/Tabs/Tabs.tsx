import React from "react";
import { Tab } from "../Tab";
import styles from "./styles.scss";
import { TTabsProps } from "./types";

export const Tabs: React.FC<TTabsProps> = ({ tabs }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <Tab {...tab} key={tab.id} />
      ))}
    </div>
  );
};
