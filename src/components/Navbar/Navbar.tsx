/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Tab } from "../Tab";
import "./style.css";

export interface TNavbarProps {
  className: any;
  username: string;
}

export const Navbar: React.FC<TNavbarProps> = ({
  className,
  username = "Profile",
}) => {
  return (
    <div className={`navbar ${className}`}>
      <div className="container">
        <div className="link">
          <div className="div">conduit</div>
        </div>
        <div className="navbar-nav">
          <Tab
            className="tab-instance"
            divClassName="design-component-instance-node"
            hasIcon={false}
            text="Home"
            variant="menu"
          />
          <Tab
            className="tab-instance"
            iconIcon="edit"
            text="New Post"
            variant="menu"
          />
          <Tab
            className="tab-instance"
            iconIcon="settings"
            text="Settings"
            variant="menu"
          />
          <Tab
            className="tab-instance"
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
