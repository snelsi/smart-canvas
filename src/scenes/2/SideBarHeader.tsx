import * as React from "react";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <h2>
      <a href="/public/tasks/lab1.pdf" target="_blank" rel="noopener noreferrer">
        Нелiнiйнi перетворення
      </a>
    </h2>
  );
};
