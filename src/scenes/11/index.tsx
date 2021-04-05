import { MdHighlight } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import SceneComponent from "./Scene";

export const prefix = "11-";

export const menuItems: IMenuItem[] = [
  {
    type: "select",
    fieldName: `${prefix}preset`,
    title: "Preset",
    defaultValue: "sunset",
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
    type: "optional-group",
    fieldName: `${prefix}show-light`,
    title: "Directional Light",
    defaultValue: true,
    items: [
      {
        type: "slider",
        fieldName: `${prefix}x-position`,
        title: "X координата",
        defaultValue: 1,
        minValue: -100,
        maxValue: 100,
        step: 1,
      },
      {
        type: "slider",
        fieldName: `${prefix}y-position`,
        title: "Y координата",
        defaultValue: 1,
        minValue: -100,
        maxValue: 100,
        step: 1,
      },
      {
        type: "slider",
        fieldName: `${prefix}z-position`,
        title: "Z координата",
        defaultValue: 1,
        minValue: -100,
        maxValue: 100,
        step: 1,
      },
      {
        type: "color",
        fieldName: `${prefix}lightColor`,
        title: "Color",
        defaultValue: "#FFA500",
      },
      {
        type: "slider",
        fieldName: `${prefix}lightIntensity`,
        title: "Intensity",
        defaultValue: 10,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    ],
  },
  {
    type: "tab",
    fieldName: `${prefix}figure`,
    title: "Фигура",
    items: [
      {
        type: "slider",
        fieldName: `${prefix}a`,
        title: "A",
        step: 0.1,
        defaultValue: 1,
        minValue: 0.1,
        maxValue: 2,
      },
      {
        type: "slider",
        fieldName: `${prefix}b`,
        title: "B",
        step: 0.1,
        defaultValue: 5 / 2,
        minValue: 0.1,
        maxValue: 5,
      },
      {
        type: "slider",
        fieldName: `${prefix}segments1`,
        title: "Segments X",
        step: 1,
        defaultValue: 40,
        minValue: 4,
        maxValue: 100,
      },
      {
        type: "slider",
        fieldName: `${prefix}segments2`,
        title: "Segments Y",
        step: 1,
        defaultValue: 40,
        minValue: 4,
        maxValue: 100,
      },
      {
        type: "slider",
        fieldName: `${prefix}metalness`,
        title: "metalness",
        step: 0.1,
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
      {
        type: "slider",
        fieldName: `${prefix}roughness`,
        title: "Roughness",
        step: 0.1,
        defaultValue: 0.8,
        minValue: 0,
        maxValue: 1,
      },
      {
        type: "switcher",
        fieldName: `${prefix}showHelpers`,
        title: "Show Helpers",
        defaultValue: false,
      },
      {
        type: "color",
        fieldName: `${prefix}color`,
        title: "Color",
        defaultValue: "#FFA500",
      },
    ],
  },
  {
    type: "optional-group",
    fieldName: `${prefix}show-texture`,
    title: "Текстура",
    defaultValue: true,
    items: [
      {
        type: "slider",
        fieldName: `${prefix}big-radius`,
        title: "R - Радиус неподвижной окружности",
        defaultValue: 0.6,
        minValue: 0.1,
        maxValue: 10,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}small-radius`,
        title: "r - Радиус катящейся окружности",
        defaultValue: 0.2,
        minValue: 0.1,
        maxValue: 10,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}tex-x-position`,
        title: "X координата",
        defaultValue: 0,
        minValue: -20,
        maxValue: 20,
        step: 0.1,
      },
      {
        type: "slider",
        fieldName: `${prefix}tex-y-position`,
        title: "Y координата",
        defaultValue: 0,
        minValue: -20,
        maxValue: 20,
        step: 0.1,
      },
      {
        type: "switcher",
        fieldName: `${prefix}texture-animation`,
        title: "Анимация",
        defaultValue: true,
      },
    ],
  },
];

export const scene: Scene = {
  title: "Сложная фигура",
  icon: <MdHighlight />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
