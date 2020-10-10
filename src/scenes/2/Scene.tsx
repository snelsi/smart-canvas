import React, { useEffect } from "react";

import { useField } from "scripts";

import { useUpdate } from "react-three-fiber";

import { prefix } from ".";
import { Controls, Figure } from "../1/Scene/Scene";

const degToRad = (degrees: number) => degrees * (Math.PI / 180);

export const Scene = () => {
  const [valueX] = useField<number>(`${prefix}x-position`);
  const [valueY] = useField<number>(`${prefix}y-position`);
  const [rotation] = useField<number>(`${prefix}rotation`);

  const groupRef = useUpdate<THREE.Group>(
    (geometry) => {
      geometry.position.x = valueX;
      geometry.position.y = valueY;
      geometry.rotation.z = degToRad(rotation);
    },
    [valueX, valueY, rotation],
  );

  useEffect(() => {}, []);

  return (
    <>
      <Controls />
      <group ref={groupRef}>
        <Figure />
      </group>
    </>
  );
};
