import React from "react";

import * as THREE from "three";

interface GridProps {
  position?: THREE.Vector3;
  rotation?: THREE.Euler | [number, number, number];
}
export const Grid: React.FC<GridProps> = React.memo(
  ({ rotation = [Math.PI / 2, 0, 0], position = new THREE.Vector3(0, 0, 0) }) => (
    <gridHelper
      args={[100, 100, "rgb(20, 40, 255)", "rgb(10, 10, 10)"]}
      position={position}
      rotation={rotation as THREE.Euler}
    />
  ),
);
