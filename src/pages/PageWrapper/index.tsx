import React, { PropsWithChildren } from "react";
import { Banner } from "../../components/Banner";
import { PaginationBar } from "../../components/PaginationBar";
import { TPageWrapperProps } from "./types";
import "./style.scss";

export const PageWrapper: React.FC<PropsWithChildren<TPageWrapperProps>> = ({
  bannerProps,
  paginationBarProps,
  children,
}) => {
  return (
    <div className="page">
      <Banner {...bannerProps} />
      <div className="page-container">
        <div className="row">{children}</div>
      </div>
      {paginationBarProps && <PaginationBar {...paginationBarProps} />}
    </div>
  );
};
