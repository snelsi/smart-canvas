import React from "react";
import { IMenuItem } from "components";

import { scene as Scene1 } from "./1/index";
import { scene as Scene2 } from "./2/index";

export interface Scene {
  title: string;
  titleLink?: string;
  icon: React.ReactElement;
  menuItems: IMenuItem[];
  initialValues?: { [key: string]: any };
  scene: React.ReactElement;
  sideBarHeader?: React.ReactElement;
}
export const scenes: { [key: string]: Scene } = {
  "/1": Scene1,
  "/2": Scene2,
};
