import React from "react";
import { Tags } from "../Tag/Tag";
import { Typography } from "../Typography";
import styles from "./style.scss";
import { TSidebarProps } from "./types";
import { ETypographyType } from "../Typography/types";

export const Sidebar: React.FC<TSidebarProps> = ({ tags, title }) => {
  return (
    <div className={styles.wrapper}>
      <Typography
        className={styles.content}
        value={title}
        variant={ETypographyType.RegularBold}
      />
      <Tags tags={tags} />
    </div>
  );
};
