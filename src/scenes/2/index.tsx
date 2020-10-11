import React from "react";
import { MdTimeline } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import { Scene as SceneComponent } from "./Scene";

export const prefix = "2-";

export const menuItems: IMenuItem[] = [
  {
    type: "slider",
    fieldName: `${prefix}scale`,
    title: "Розмiр",
    defaultValue: 1,
    minValue: 0,
    maxValue: 10,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}x-position`,
    title: "X position",
    defaultValue: 0,
    minValue: -20,
    maxValue: 20,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}y-position`,
    title: "Y position",
    defaultValue: 0,
    minValue: -20,
    maxValue: 20,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}rotation`,
    title: "Rotation",
    defaultValue: 0,
    minValue: -360,
    maxValue: 360,
    step: 0.1,
  },
  {
    type: "optional-group",
    fieldName: `${prefix}show-advanced`,
    title: "Показать дополнительные настройки",
    defaultValue: false,
    items: [
      {
        type: "slider",
        fieldName: `${prefix}z-position`,
        title: "Z position",
        defaultValue: 0,
        minValue: -20,
        maxValue: 20,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}x-rotation`,
        title: "X Rotation",
        defaultValue: 0,
        minValue: -360,
        maxValue: 360,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}y-rotation`,
        title: "Y Rotation",
        defaultValue: 0,
        minValue: -360,
        maxValue: 360,
        step: 0.1,
      },
    ],
  },
];

export const scene: Scene = {
  title: "Фiгура у просторi",
  icon: <MdTimeline />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
