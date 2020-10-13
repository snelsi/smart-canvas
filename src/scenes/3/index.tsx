import React from "react";
import { MdFlipToFront } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import { Scene as SceneComponent } from "./Scene";

export const prefix = "3-";

export const menuItems: IMenuItem[] = [
  {
    type: "group",
    title: "Матричное искривление",
    items: [
      {
        type: "slider",
        fieldName: `${prefix}Syx`,
        title: "Множитель Syx",
        defaultValue: 0,
        minValue: -1,
        maxValue: 1,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}Szx`,
        title: "Множитель Szx",
        defaultValue: 0,
        minValue: -1,
        maxValue: 1,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}Sxy`,
        title: "Множитель Sxy",
        defaultValue: 0,
        minValue: -1,
        maxValue: 1,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}Szy`,
        title: "Множитель Szy",
        defaultValue: 0,
        minValue: -1,
        maxValue: 1,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}Sxz`,
        title: "Множитель Sxz",
        defaultValue: 0,
        minValue: -1,
        maxValue: 1,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}Syz`,
        title: "Множитель Syz",
        defaultValue: 0,
        minValue: -1,
        maxValue: 1,
        step: 0.1,
      },
    ],
  },
  {
    type: "group",
    title: "Расстяжение",
    items: [
      {
        type: "slider",
        fieldName: `${prefix}scale-x`,
        title: "Множитель по x",
        defaultValue: 1,
        minValue: 0.1,
        maxValue: 20,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}scale-y`,
        title: "Множитель по y",
        defaultValue: 1,
        minValue: 0.1,
        maxValue: 20,
        step: 0.1,
      },
    ],
  },
];

export const scene: Scene = {
  title: "Деформация пространства",
  icon: <MdFlipToFront />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
