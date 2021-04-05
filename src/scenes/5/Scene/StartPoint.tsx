import * as React from "react";

import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

interface StartPointProps {
  x: number;
  y: number;
  z?: number;
  color?: ReactThreeFiber.Color;
}

export const StartPoint: React.FC<StartPointProps> = ({ x, y, z = 0, color = 0xffffff }) => {
  const meshRef = React.useRef<THREE.Mesh>();
  React.useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.x = x;
      meshRef.current.position.y = y;
      meshRef.current.position.z = z;
    }
  }, [x, y, z]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 20, 20]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};
