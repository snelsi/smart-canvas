import React from "react";
import { IMenuItem } from "components";

import { scene as Scene1 } from "./1/index";
import { scene as Scene2 } from "./2/index";
import { scene as Scene3 } from "./3/index";
import { scene as Scene5 } from "./5/index";
import { scene as Scene6 } from "./6/index";
import { scene as Scene7 } from "./7/index";
import { scene as Scene8 } from "./8/index";
import { scene as Scene9 } from "./9/index";
import { scene as Scene10 } from "./10/index";
import { scene as Scene11 } from "./11/index";

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
  "/3": Scene3,
  "/5": Scene5,
  "/6": Scene6,
  "/7": Scene7,
  "/8": Scene8,
  "/9": Scene9,
  "/10": Scene10,
  "/11": Scene11,
};
