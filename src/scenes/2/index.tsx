import React from "react";
import { Scene } from "scenes";
import { MdTimeline, MdRotateRight, MdRotateLeft } from "react-icons/md";
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
    fieldName: `${prefix}z-rotation`,
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
        step: 0.05,
      },
      {
        type: "slider",
        fieldName: `${prefix}y-rotation`,
        title: "Y Поворот",
        defaultValue: 0,
        minValue: -360,
        maxValue: 360,
        step: 0.05,
      },
    ],
  },
  {
    type: "slider",
    fieldName: `${prefix}rotation-point-x`,
    title: "Точка вращения X",
    defaultValue: -8,
    minValue: -40,
    maxValue: 40,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}rotation-point-y`,
    title: "Точка вращения Y",
    defaultValue: 8,
    minValue: -40,
    maxValue: 40,
    step: 0.1,
  },
  {
    type: "double-input-action",
    fieldName: `${prefix}rotate-action-value`,
    defaultValue: 0,
    minValue: -360,
    maxValue: 360,
    title: "Поворот относительно точки",
    actionOneName: `${prefix}rotate-action-1`,
    actionOneTitle: <MdRotateRight />,
    actionTwoName: `${prefix}rotate-action-2`,
    actionTwoTitle: <MdRotateLeft />,
  },
  {
    type: "action",
    fieldName: `${prefix}reset-scene`,
    title: "Сбросить параметры",
    defaultValue: 0,
  },
  // {
  //   type: "slider",
  //   fieldName: `${prefix}rotation-point-z`,
  //   title: "z",
  //   defaultValue: 0,
  //   minValue: -40,
  //   maxValue: 40,
  //   step: 0.1,
  // },
];

export const scene: Scene = {
  title: "Фигура в пространстве",
  icon: <MdTimeline />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
