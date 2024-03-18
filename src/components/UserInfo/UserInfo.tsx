import React from "react";
import { getClassNames } from "../../utils/styles";
import { Icon } from "../Icon";
import styles from "./style.scss";
import { TUserInfoProps } from "./types";

export const UserInfo: React.FC<TUserInfoProps> = ({
  date,
  username,
  className,
}) => {
  return (
    <div
      tabIndex={0}
      className={getClassNames(["user-info", className], styles)}
    >
      <Icon icon="person" />
      <div className={styles.description}>
        <span className={styles.username}>{username}</span>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
};
