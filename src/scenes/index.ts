import React from "react";
import { IconType } from "react-icons";
import { MenuItem } from "components";

import { scene as Scene1 } from "./1/index";
import { scene as Scene2 } from "./2/index";

export interface Scene {
  title: string;
  icon: React.ReactElement;
  menuItems: MenuItem[];
  initialValues?: { [key: string]: any };
  scene: React.ReactElement;
  sideBarHeader?: React.ReactElement;
}
export const scenes: { [key: string]: Scene } = {
  "/1": Scene1,
  "/2": Scene2,
};
