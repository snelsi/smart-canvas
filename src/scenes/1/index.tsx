import React from "react";
import { MdBorderInner } from "react-icons/md";
import { Scene } from "scenes";
import { MenuItem } from "components";

import { SideBarHeader } from "./SideBarHeader";
import SceneComponent from "./Scene";

export const prefix = "1-";

export const menuItems: MenuItem[] = [
  {
    type: "slider",
    fieldName: `${prefix}squareSideSize`,
    title: "N",
    defaultValue: 36,
    minValue: 0.1,
    maxValue: 100,
    step: 0.1,
  },
  {
    type: "slider",
    fieldName: `${prefix}innerCircleRaduis`,
    title: "R1",
    defaultValue: 1,
    minValue: 0.05,
    maxValue: 10,
    step: 0.05,
  },
  {
    type: "slider",
    fieldName: `${prefix}outterCircleRaduis`,
    title: "R2",
    defaultValue: 1.5,
    minValue: 0.05,
    maxValue: 10,
    step: 0.05,
  },
  {
    type: "slider",
    fieldName: `${prefix}cornerCircleRaduis`,
    title: "R3",
    defaultValue: 1,
    minValue: 0,
    maxValue: 10,
    step: 0.05,
  },
  {
    type: "slider",
    fieldName: `${prefix}diagonalCircleRaduis`,
    title: "R4",
    defaultValue: 1.2,
    minValue: 0,
    maxValue: 10,
    step: 0.05,
  },
];

export const scene: Scene = {
  title: "Лінійні перетворення",
  titleLink: "tasks/lab1.pdf",
  icon: <MdBorderInner />,
  sideBarHeader: <SideBarHeader />,
  menuItems,
  scene: <SceneComponent />,
  initialValues: {},
};
