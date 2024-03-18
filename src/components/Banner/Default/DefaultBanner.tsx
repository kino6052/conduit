import React from "react";
import { getClassNames } from "../../../utils/styles";
import { Typography } from "../../Typography";
import { ETypographyType } from "../../Typography/types";
import styles from "./styles.scss";

export const DefaultBanner: React.FC = () => {
  return (
    <div className={getClassNames(["wrapper", "green"], styles)}>
      <div className={styles.content}>
        <Typography
          value="conduit"
          variant={ETypographyType.Heading1}
          className={styles.white}
        />
        <Typography
          value="A place to share your knowledge."
          className={styles.white}
        />
      </div>
    </div>
  );
};
