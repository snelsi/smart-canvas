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
      fieldName: `${prefix}x-position`,
      title: "X position",
      defaultValue: 0,
      minValue: -20,
      maxValue: 20,
      step: 0.1,
    },
    {
      type: "slider",
      fieldName: `${prefix}y-position`,
      title: "Y position",
      defaultValue: 0,
      minValue: -20,
      maxValue: 20,
      step: 0.1,
    },
    {
      type: "slider",
      fieldName: `${prefix}rotation`,
      title: "Rotation",
      defaultValue: 0,
      minValue: -360,
      maxValue: 360,
      step: 0.1,
    },
  ],
  scene: <SceneComponent />,
  initialValues: {},
};
