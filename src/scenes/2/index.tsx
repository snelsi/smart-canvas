import React from "react";
import { MdTimeline } from "react-icons/md";
import { Scene } from "scenes";

import { SideBarHeader } from "./SideBarHeader";
import { Scene as SceneComponent } from "./Scene";

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
      defaultValue: 1,
      minValue: 0,
      maxValue: 10,
      step: 0.1,
    },
    {
      type: "slider",
      fieldName: `${prefix}innerCircleRaduis`,
      title: "R1",
      defaultValue: 1,
      minValue: 0,
      maxValue: 10,
      step: 0.1,
    },
    {
      type: "slider",
      fieldName: `${prefix}outterCircleRaduis`,
      title: "R2",
    },
  ],
  scene: <SceneComponent />,
  initialValues: {},
};
