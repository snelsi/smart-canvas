import * as React from "react";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <p>
      <span role="img" aria-label="Attention">
        ⚠️
      </span>{" "}
      Использование некоторых множителей вместе может поломать фигуру.
    </p>
  );
};
