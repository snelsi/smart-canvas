import React from "react";
import { MdBorderInner } from "react-icons/md";
import { Scene } from "scenes";

import { SideBarHeader } from "./SideBarHeader";
import { Scene as SceneComponent } from "./Scene";

export const prefix = "1-";

export const scene: Scene = {
  title: "Лінійні перетворення",
  titleLink: "tasks/lab1.pdf",
  icon: <MdBorderInner />,
  sideBarHeader: <SideBarHeader />,
  menuItems: [
    {
      type: "slider",
      fieldName: `${prefix}squareSideSize`,
      title: "N",
      defaultValue: 1,
      minValue: 0.1,
      maxValue: 100,
      step: 0.1,
    },
    {
      type: "slider",
      fieldName: `${prefix}innerCircleRaduis`,
      title: "R1",
    },
    {
      type: "slider",
      fieldName: `${prefix}outterCircleRaduis`,
      title: "R2",
    },
    {
      type: "slider",
      fieldName: `${prefix}cornerCircleRaduis`,
      title: "R3",
    },
    {
      type: "slider",
      fieldName: `${prefix}diagonalCircleRaduis`,
      title: "R4",
    },
    {
      type: "slider",
      fieldName: `${prefix}spaceFromCenter`,
      title: "D",
    },
  ],
  scene: <SceneComponent />,
  initialValues: {},
};
