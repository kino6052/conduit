import React from "react";
import { getClassNames } from "../../utils/styles";
import { Icon } from "../Icon";
import styles from "./style.scss";

export const Loader: React.FC = () => {
  return (
    <div className={getClassNames(["wrapper"], styles)}>
      <Icon className={styles.icon} icon="favorite" />
    </div>
  );
};
