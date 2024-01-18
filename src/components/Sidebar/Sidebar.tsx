import React from "react";
import { Tags } from "../Tag/Tag";
import { Typography } from "../Typography";
import "./style.css";
import { TSidebarProps } from "./types";

export const Sidebar: React.FC<Partial<TSidebarProps>> = ({ tags, title }) => {
  return (
    <div className={`sidebar`}>
      <Typography
        className="heading-instance"
        value={title}
        variant="regular-bold"
      />
      <Tags tags={tags} />
    </div>
  );
};
