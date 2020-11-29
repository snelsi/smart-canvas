import * as React from "react";

import * as THREE from "three";
import { ReactThreeFiber, useUpdate } from "react-three-fiber";

interface StartPointProps {
  x: number;
  y: number;
  z?: number;
  color?: ReactThreeFiber.Color;
}

export const StartPoint: React.FC<StartPointProps> = ({ x, y, z = 0, color = 0xffffff }) => {
  const meshRef = useUpdate<THREE.Mesh>(
    (geometry) => {
      geometry.position.x = x;
      geometry.position.y = y;
      geometry.position.z = z;
    },
    [x, y, z],
  );

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 20, 20]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};
