/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { Tag } from "../Tag";
import { Tags } from "../Tag/Tag";
import { UserInfo } from "../UserInfo";
import "./style.css";

export interface TPostProps {
  title: string;
  date: string;
  description: string;
  username: string;
  tags: string[];
  likes: number;
}

export const Post: React.FC<TPostProps> = ({
  title = "Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!",
  date = "01 January 2024",
  description = "Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!",
  username = "John Lobster",
  likes = 64,
  tags = [],
}) => {
  return (
    <div className={`post`}>
      <div className="post-heading">
        <UserInfo
          className="design-component-instance-node-2"
          date={date}
          username={username}
        />
        <Button
          id={title}
          className="design-component-instance-node-2"
          text={String(likes)}
          variant="secondary-small"
        />
      </div>
      <div className="post-content">
        <Heading className="heading-2" value={title} variant="h-2" />
        <Heading
          className="heading-2"
          value={description}
          variant="regular-grey"
        />
        <Tags tags={tags} />
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  username: PropTypes.string,
  buttonText: PropTypes.string,
  headingValue: PropTypes.string,
  headingValue1: PropTypes.string,
};
