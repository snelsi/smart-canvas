import * as React from "react";

import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

import { useField } from "scripts";
import { prefix } from "..";

interface RotationPointProps {}

export const RotationPoint: React.FC<RotationPointProps> = () => {
  const [posX] = useField<number>(`${prefix}rotation-point-x`);
  const [posY] = useField<number>(`${prefix}rotation-point-y`);
  //   const [posZ] = useField<number>(`${prefix}rotation-point-z`);

  const meshRef = useUpdate<THREE.Mesh>(
    (geometry) => {
      geometry.position.x = posX;
      geometry.position.y = posY;
      //   geometry.position.z = posZ;
    },
    [posX, posY],
  );

  return (
    <mesh ref={meshRef} name="2SceneRotationPoint">
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="#1cd04b" />
    </mesh>
  );
};
