import React from "react";
import { MdPolymer } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import SceneComponent from "./Scene";

export const prefix = "9-";

export const menuItems: IMenuItem[] = [
  {
    type: "slider",
    fieldName: `${prefix}iterations`,
    title: "Итераций",
    defaultValue: 10,
    minValue: 1,
    maxValue: 20,
  },
  {
    type: "switcher",
    fieldName: `${prefix}show-color`,
    title: "Включить радугу",
    defaultValue: true,
  },
  {
    type: "switcher",
    fieldName: `${prefix}show-volume`,
    title: "Включить объём",
    defaultValue: false,
  },
  {
    type: "optional-group",
    fieldName: `${prefix}show-advanced`,
    title: "Показать дополнительные настройки",
    defaultValue: false,
    items: [
      {
        type: "slider",
        fieldName: `${prefix}length`,
        title: "Длина сегмента",
        step: 0.1,
        defaultValue: 1,
        minValue: 0.1,
        maxValue: 5,
      },
      {
        type: "slider",
        fieldName: `${prefix}start-x`,
        title: "Сдвиг по x",
        defaultValue: 0,
        minValue: -20,
        maxValue: 20,
      },
      {
        type: "slider",
        fieldName: `${prefix}start-y`,
        title: "Сдвиг по y",
        defaultValue: 0,
        minValue: -20,
        maxValue: 20,
      },
      {
        type: "slider",
        fieldName: `${prefix}rotation`,
        title: "Вращение",
        defaultValue: 0,
        minValue: -90,
        maxValue: 90,
      },
    ],
  },
];

export const scene: Scene = {
  title: "Кривая Дракона",
  titleLink: "https://en.wikipedia.org/wiki/Dragon_curve",
  icon: <MdPolymer />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
