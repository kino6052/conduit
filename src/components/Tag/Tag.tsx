import React from "react";
import styles from "./style.scss";
import { TTagProps } from "./types";
import { getClassNames } from "../../utils/styles";

export const Tag: React.FC<TTagProps> = ({ text = "tag", className }) => {
  return (
    <div tabIndex={0} className={getClassNames(["wrapper", className], styles)}>
      <span className={styles.content}>{text}</span>
    </div>
  );
};

export const Tags: React.FC<{ tags: TTagProps[] }> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Tag {...tag} />
      ))}
    </div>
  );
};
