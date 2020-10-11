import * as React from "react";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <p>
      <span role="img" aria-label="Cute turtle">
        ➰
      </span>{" "}
      Twist
    </p>
  );
};
