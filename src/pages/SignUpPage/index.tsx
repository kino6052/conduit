import React from "react";
import { Button } from "../../components/Button";
import { EButtonVariant } from "../../components/Button/types";
import { Input } from "../../components/Input/Input";
import { Link } from "../../components/Link";
import { Typography } from "../../components/Typography";
import styles from "./styles.scss";
import { TSignUpPageProps } from "./types";
import { ETypographyType } from "../../components/Typography/types";

export const SignUpPage: React.FC<TSignUpPageProps> = ({
  passwordInputProps,
  usernameInputProps,
  buttonProps,
}) => {
  return (
    <div className={styles.wrapper}>
      <Typography variant={ETypographyType.Heading1} value="Sign Up" />
      <Link>
        <Typography value="Go to the documentation page" />
      </Link>
      <div className={styles.form}>
        <Input {...usernameInputProps} />
        <Input {...passwordInputProps} />
      </div>
      <Button variant={EButtonVariant.Primary} {...buttonProps} />
    </div>
  );
};
