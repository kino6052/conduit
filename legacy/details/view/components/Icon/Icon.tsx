import React from "react";
import styles from "./style.scss";
import { TIconProps } from "./types";
import { getClassNames } from "../../../../utils/styles";
import { Typography } from "../Typography";

export const Icon: React.FC<TIconProps> = ({
  icon = "favorite",
  text,
  className,
}) => {
  return (
    <div className={styles["wrapper"]}>
      <span className={getClassNames(["icon", className], styles)}>{icon}</span>
      {text && <Typography value={text} />}
    </div>
  );
};
