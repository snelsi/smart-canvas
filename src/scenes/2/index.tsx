import React from "react";
import { MdTimeline } from "react-icons/md";
import { Scene } from "scenes";

import { SideBarHeader } from "./SideBarHeader";

export const prefix = "2-";

export const scene: Scene = {
  title: "Нелінійні перетворення",
  icon: <MdTimeline />,
  sideBarHeader: <SideBarHeader />,
  menuItems: [
    {
      type: "slider",
      fieldName: `${prefix}squareSideSize`,
      title: "N",
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
  ],
  scene: null,
  initialValues: {},
};
