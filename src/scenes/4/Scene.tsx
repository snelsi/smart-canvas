import React from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { CameraControls } from "components";
import { useField } from "scripts";
import { prefix } from ".";

function twistGeometry(geometry: THREE.BoxGeometry, twistAmount = 10) {
  if (twistAmount === 0) return;
}

export const Scene = () => {
  const [twist] = useField<number>(`${prefix}twist`);

  const geometryRef = React.useRef<THREE.BoxGeometry>();

  return (
    <>
      <CameraControls />
      <mesh>
        <boxGeometry
          ref={geometryRef}
          parameters={{
            width: 2,
            height: 2,
            depth: 2,
            widthSegments: 40,
            heightSegments: 40,
            depthSegments: 40,
          }}
        />
        <meshNormalMaterial wireframe={true} />
      </mesh>
    </>
  );
};
