import * as React from "react";

import { Image } from "components";
import Bezier from "./bezier.gif";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <Image
      src={Bezier}
      alt="Cubic curve illustration"
      style={{ padding: "2em 0", backgroundColor: "white" }}
    />
  );
};
