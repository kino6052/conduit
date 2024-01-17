/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icon } from "../Icon";
import "./style.css";

export interface TUserInfo {
  date: string;
  username: string;
}

export const UserInfo = ({
  date = "01 January 2023",
  username = "John Lobster",
  className,
}: Props): JSX.Element => {
  return (
    <div className={`user-info ${className}`}>
      <Icon className="icon-2" icon="person" variant="with-icon" />
      <div className="description">
        <div className="username">{username}</div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  date: PropTypes.string,
  username: PropTypes.string,
};
