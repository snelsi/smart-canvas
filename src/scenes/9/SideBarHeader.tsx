import * as React from "react";

import { Image } from "components";
import Bezier from "./dragon_curve.gif";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <Image src={Bezier} alt="Dragon Curve illustration" style={{ backgroundColor: "white" }} />
  );
};
