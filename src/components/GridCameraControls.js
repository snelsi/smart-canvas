import React from "react";

import * as THREE from "three";
import { CameraControls } from "components/CameraControls";

export const GridCameraControls = ({
  maxAzimuthAngle = Math.PI / 4,
  minAzimuthAngle = -Math.PI / 4,
  maxPolarAngle = Math.PI,
  minPolarAngle = 0,
  enableZoom = true,
  mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.ROTATE,
  },
  touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN,
    THREE: THREE.TOUCH.ROTATE,
  },
  ...props
}) => {
  return (
    <CameraControls
      enableZoom={enableZoom}
      maxAzimuthAngle={maxAzimuthAngle}
      maxPolarAngle={maxPolarAngle}
      minAzimuthAngle={minAzimuthAngle}
      minPolarAngle={minPolarAngle}
      mouseButtons={mouseButtons}
      touches={touches}
      {...props}
    />
  );
};
