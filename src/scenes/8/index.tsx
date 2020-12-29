import React from "react";
import { MdWhatshot } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import SceneComponent from "./Scene";

export const prefix = "8-";

export const menuItems: IMenuItem[] = [
  {
    type: "slider",
    fieldName: `${prefix}pos-x`,
    title: "Сдвиг по x",
    defaultValue: 10,
    minValue: 0,
    maxValue: 20,
  },
  {
    type: "slider",
    fieldName: `${prefix}pos-y`,
    title: "Сдвиг по y",
    defaultValue: 26,
    minValue: 15,
    maxValue: 30,
  },
  {
    type: "slider",
    fieldName: `${prefix}pos-z`,
    title: "Сдвиг по z",
    defaultValue: 10,
    minValue: 0,
    maxValue: 20,
  },
  {
    type: "switcher",
    fieldName: `${prefix}use-texture`,
    title: "Включить текстуру",
    defaultValue: false,
  },
];

export const scene: Scene = {
  title: "Сердечко",
  icon: <MdWhatshot />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
