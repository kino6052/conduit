import React from "react";
import { Button } from "../Button";
import { Tags } from "../Tag/Tag";
import { UserInfo } from "../UserInfo";
import { Typography } from "../Typography";
import { Link } from "../Link";

import "./style.css";

export interface TPostProps {
  id: string;
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
  id,
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
          id={id}
          className="design-component-instance-node-2"
          text={String(likes)}
          variant="secondary-small"
        />
      </div>
      <div className="post-content">
        <Link id={id}>
          <Typography className="heading-2" value={title} variant="h-2" />
          <Typography
            className="heading-2"
            value={description}
            variant="regular-grey"
          />
        </Link>
        <Tags tags={tags} />
      </div>
    </div>
  );
};
