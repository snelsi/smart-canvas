import { MdInvertColors } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import SceneComponent from "./Scene";

export const prefix = "10-";

export const menuItems: IMenuItem[] = [
  {
    type: "select",
    fieldName: `${prefix}preset`,
    title: "Background",
    defaultValue: "none",
    options: [
      "none",
      "sunset",
      "dawn",
      "night",
      "warehouse",
      "forest",
      "apartment",
      "studio",
      "city",
      "park",
      "lobby",
    ],
  },
  {
    type: "slider",
    fieldName: `${prefix}segments`,
    title: "Segments",
    step: 1,
    defaultValue: 20,
    minValue: 3,
    maxValue: 100,
  },
  {
    type: "slider",
    fieldName: `${prefix}phiStart`,
    title: "φ Start",
    step: 1,
    defaultValue: 0,
    minValue: -180,
    maxValue: 180,
  },
  {
    type: "slider",
    fieldName: `${prefix}phiLength`,
    title: "φ Length",
    step: 1,
    defaultValue: 360,
    minValue: 1,
    maxValue: 360,
  },
  {
    type: "color",
    fieldName: `${prefix}color`,
    title: "Color",
    defaultValue: "#FF4D8E",
  },
  {
    type: "optional-group",
    fieldName: `${prefix}show-curve`,
    title: "Кривая",
    defaultValue: false,
    items: [
      {
        type: "slider",
        fieldName: `${prefix}k`,
        title: "Количество точек кривой",
        defaultValue: 10,
        minValue: 2,
        maxValue: 20,
        step: 1,
      },
    ],
  },
  {
    type: "optional-group",
    fieldName: `${prefix}show-position`,
    title: "Положение фигуры",
    defaultValue: false,
    items: [
      {
        type: "slider",
        fieldName: `${prefix}scale`,
        title: "Размер",
        defaultValue: 1,
        minValue: 0.1,
        maxValue: 10,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}x-position`,
        title: "X координата",
        defaultValue: 0,
        minValue: -100,
        maxValue: 100,
        step: 1,
      },
      {
        type: "slider",
        fieldName: `${prefix}y-position`,
        title: "Y координата",
        defaultValue: 0,
        minValue: -100,
        maxValue: 100,
        step: 1,
      },
      {
        type: "slider",
        fieldName: `${prefix}z-position`,
        title: "Z координата",
        defaultValue: 0,
        minValue: -100,
        maxValue: 100,
        step: 1,
      },
      {
        type: "slider",
        fieldName: `${prefix}x-rotation`,
        title: "X Поворот",
        defaultValue: 0,
        minValue: -180,
        maxValue: 180,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}y-rotation`,
        title: "Y Поворот",
        defaultValue: 0,
        minValue: -180,
        maxValue: 180,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}z-rotation`,
        title: "Z Поворот",
        defaultValue: 0,
        minValue: -180,
        maxValue: 180,
        step: 0.1,
      },
    ],
  },
  {
    type: "switcher",
    fieldName: `${prefix}showHelpers`,
    title: "Helpers",
    defaultValue: false,
  },
];

export const scene: Scene = {
  title: "Фигура вращения",
  icon: <MdInvertColors />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
