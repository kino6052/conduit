/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import { TTagProps } from "./types";

export const Tag = ({ text = "tag", className }: TTagProps): JSX.Element => {
  return (
    <div className={`tag ${className}`}>
      <div className="text-wrapper-3">{text}</div>
    </div>
  );
};

export const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <Tag text={tag} />
      ))}
    </div>
  );
};
