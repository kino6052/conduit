import React from "react";

export type TPaginationButtonProps = {
  value: string;
  isSelected: boolean;
  className?: string;
  id: string;
  onClick: React.MouseEventHandler;
};
