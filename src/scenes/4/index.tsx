import React from "react";
import { MdFlipToFront } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import { Scene as SceneComponent } from "./Scene";

export const prefix = "4-";

export const menuItems: IMenuItem[] = [
  {
    type: "slider",
    fieldName: `${prefix}twist`,
    title: "Твист",
    defaultValue: 1,
    minValue: 0.1,
    maxValue: 20,
    step: 0.1,
  },
];

export const scene: Scene = {
  title: "Деформация фигуры",
  icon: <MdFlipToFront />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
