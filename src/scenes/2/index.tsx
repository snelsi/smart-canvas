import React from "react";
import { MdTimeline } from "react-icons/md";
import { Scene } from "scenes";

import { SideBarHeader } from "./SideBarHeader";

export const scene: Scene = {
  title: "Нелінійні перетворення",
  icon: <MdTimeline />,
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
  ],
  scene: null,
  initialValues: {},
};
