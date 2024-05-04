import React from "react";
import { getClassNames } from "../../../../../../utils/styles";
import { Button } from "../../Button";
import { Typography } from "../../Typography";
import { ETypographyType } from "../../Typography/types";
import styles from "./styles.scss";
import { TProfileBannerProps } from "./types";
import { EProfileBannerConstant } from "./constants";
import { EUserInfoConstant } from "../../UserInfo/constants";

export const ProfileBanner: React.FC<TProfileBannerProps> = ({
  userInfoProps: { username, imageSrc },
  followButtonProps,
}) => {
  return (
    <div className={getClassNames(["wrapper", "profile"], styles)}>
      <div className={styles.content}>
        <div
          className={styles.image}
          style={{ backgroundImage: imageSrc }}
        ></div>
        <Typography
          value={username}
          variant={ETypographyType.Heading2}
          className={styles.white}
        />
        <Button
          {...followButtonProps}
          slug={EUserInfoConstant.FollowUserButtonSlug}
          id={username}
        />
      </div>
    </div>
  );
};
