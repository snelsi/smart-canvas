import React from "react";
import { MdAvTimer } from "react-icons/md";
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
    defaultValue: 0,
    minValue: -10,
    maxValue: 10,
    step: 0.1,
  },
];

export const scene: Scene = {
  title: "Деформация фигуры",
  icon: <MdAvTimer />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
