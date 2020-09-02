import React from "react";
import { MdBorderInner } from "react-icons/md";
import { Scene } from "scenes";

import { SideBarHeader } from "./SideBarHeader";

export const scene: Scene = {
  title: "Лінійні перетворення",
  icon: <MdBorderInner />,
  sideBarHeader: <SideBarHeader />,
  menuItems: [
    {
      type: "slider",
      fieldName: "squareSideSize",
      title: "N",
    },
    {
      type: "slider",
      fieldName: "innerCircleRaduis",
      title: "R1",
    },
    {
      type: "slider",
      fieldName: "outterCircleRaduis",
      title: "R2",
    },
    {
      type: "slider",
      fieldName: "cornerCircleRaduis",
      title: "R3",
    },
    {
      type: "slider",
      fieldName: "diagonalCircleRaduis",
      title: "R4",
    },
    {
      type: "slider",
      fieldName: "spaceFromCenter",
      title: "D",
    },
  ],
  scene: null,
  initialValues: {},
};
