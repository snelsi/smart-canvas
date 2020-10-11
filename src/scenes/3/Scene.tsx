import React from "react";

import * as THREE from "three";
import { useUpdate, useFrame } from "react-three-fiber";

import { CameraControls } from "components";
import { useField } from "scripts";
import { prefix } from ".";

function twistGeometry(mesh, twistAmount = 10) {
  if (mesh?.geometry?.vertices) {
    const quaternion = new THREE.Quaternion();

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < mesh.geometry.vertices.length; i++) {
      // a single vertex Y position
      const yPos = mesh.geometry.vertices[i].y;
      const upVec = new THREE.Vector3(0, 1, 0);

      quaternion.setFromAxisAngle(upVec, (Math.PI / 180) * (yPos / twistAmount));

      mesh.geometry.vertices[i].applyQuaternion(quaternion);
    }

    // tells Three.js to re-render this mesh
    mesh.geometry.verticesNeedUpdate = true;
  }
}

export const Scene = () => {
  const [twist] = useField<number>(`${prefix}twist`);

  const meshRef = useUpdate<THREE.Mesh>(() => {}, []);

  useFrame(() => twistGeometry(meshRef.current, twist));

  return (
    <>
      <CameraControls />
      <mesh ref={meshRef}>
        <boxGeometry
          parameters={{
            width: 40,
            height: 40,
            depth: 40,
            widthSegments: 200,
            heightSegments: 200,
            depthSegments: 200,
          }}
        />
        <meshNormalMaterial wireframe={true} />
      </mesh>
    </>
  );
};