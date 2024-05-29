import React from "react";
import { TTagProps } from "./types";
import styles from "./style.scss";
import { Tag } from ".";

export const Tags: React.FC<{ tags: TTagProps[] }> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Tag {...tag} key={tag.id} />
      ))}
    </div>
  );
};
