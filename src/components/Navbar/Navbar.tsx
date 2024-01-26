/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { PropsWithChildren } from "react";
import { Tab } from "../Tab";
import "./style.scss";
import { EPage } from "../../types";

export interface TNavbarProps {
  id?: string;
  username: string;
}

export const Navbar: React.FC<PropsWithChildren<TNavbarProps>> = ({
  username = "Profile",
}) => {
  return (
    <div className={`navbar`}>
      <div className="container">
        <div className="link">
          <div className="div">conduit</div>
        </div>
        <div className="navbar-nav">
          <Tab
            id={EPage.Home}
            hasIcon={false}
            text="Home"
            variant="menu"
          />
          <Tab
            id={EPage.NewPostPage}
            iconIcon="edit"
            text="New Post"
            variant="menu"
          />
          <Tab
            id={EPage.Settings}
            iconIcon="settings"
            text="Settings"
            variant="menu"
          />
          <Tab
            id={EPage.Profile}
            iconIcon="person"
            text={username}
            variant="menu"
          />
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  tabText: PropTypes.string,
  tabText1: PropTypes.string,
};
