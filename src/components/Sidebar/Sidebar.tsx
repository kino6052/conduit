/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Heading } from "../Heading";
import { Tag } from "../Tag";
import { Tags } from "../Tag/Tag";
import { TTagProps } from "../Tag/types";
import "./style.css";
import { TSidebarProps } from "./types";

export const Sidebar: React.FC<Partial<TSidebarProps>> = ({ tags, title }) => {
  return (
    <div className={`sidebar`}>
      <Heading
        className="heading-instance"
        value={title}
        variant="regular-bold"
      />
      <Tags tags={tags} />
    </div>
  );
};
