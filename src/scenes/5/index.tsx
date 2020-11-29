import React from "react";
import { MdToll } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import SceneComponent from "./Scene";

export const prefix = "5-";

export const menuItems: IMenuItem[] = [
  {
    type: "slider",
    fieldName: `${prefix}big-radius`,
    title: "R - Радиус неподвижной окружности",
    defaultValue: 3,
    minValue: 0.1,
    maxValue: 10,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}small-radius`,
    title: "r - Радиус катящейся окружности",
    defaultValue: 1,
    minValue: 0.1,
    maxValue: 10,
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
        fieldName: `${prefix}rotation`,
        title: "Поворот",
        defaultValue: 0,
        minValue: -90,
        maxValue: 90,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}limits`,
        title: "Лимит шагов",
        defaultValue: 10000,
        minValue: 1,
        maxValue: 10000,
        step: 1,
      },
      {
        type: "switcher",
        fieldName: `${prefix}show-volume`,
        title: "Включить объём",
        defaultValue: false,
      },
    ],
  },
];

export const scene: Scene = {
  title: "Эпициклоида",
  titleLink: "https://en.wikipedia.org/wiki/Epicycloid",
  icon: <MdToll />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
