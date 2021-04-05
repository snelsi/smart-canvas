import React from "react";

import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const CameraControls = ({ defaultX = 0, defaultY = 0, defaultZ = 15, ...props }) => {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(defaultX, defaultY, defaultZ);
  }, [camera.position]);

  return <OrbitControls {...props} />;
};
