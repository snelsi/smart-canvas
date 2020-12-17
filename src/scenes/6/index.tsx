import React from "react";
import { MdLooks, MdFileUpload, MdFileDownload } from "react-icons/md";
import { Scene } from "scenes";
import { IMenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import SceneComponent from "./Scene";

export const prefix = "6-";

export const menuItems: IMenuItem[] = [
  {
    type: "curve-points",
    fieldName: `${prefix}curves`,
    title: "Точки",
  },
  {
    type: "double-action",
    title: "Сохранить",
    fieldName: `${prefix}points-download`,
    actionOneName: `${prefix}upload`,
    actionOneTitle: <MdFileUpload />,
    actionTwoName: `${prefix}download`,
    actionTwoTitle: <MdFileDownload />,
  },
];

export const scene: Scene = {
  title: "Квадратичные Кривые Безье",
  titleLink: "https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_curves",
  icon: <MdLooks />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
