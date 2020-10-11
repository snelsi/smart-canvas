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
    title: "Размер",
    defaultValue: 1,
    minValue: 0,
    maxValue: 10,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}x-position`,
    title: "X координата",
    defaultValue: 0,
    minValue: -20,
    maxValue: 20,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}y-position`,
    title: "Y координата",
    defaultValue: 0,
    minValue: -20,
    maxValue: 20,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}rotation`,
    title: "Поворот",
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
        title: "Z координата",
        defaultValue: 0,
        minValue: -20,
        maxValue: 20,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}x-rotation`,
        title: "X Поворот",
        defaultValue: 0,
        minValue: -360,
        maxValue: 360,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}y-rotation`,
        title: "Y Поворот",
        defaultValue: 0,
        minValue: -360,
        maxValue: 360,
        step: 0.1,
      },
    ],
  },
];

export const scene: Scene = {
  title: "Фигура в пространстве",
  icon: <MdTimeline />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
