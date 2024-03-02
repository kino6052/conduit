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
        <div className={styles.username}>{username}</div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
};
