import React from "react";

export type TPaginationBarProps = {
  pages: {
    text: string;
    onClick: () => Promise<void>;
    isSelected: boolean;
  }[];
};
