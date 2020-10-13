import React from "react";

import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

import { Grid, GridCameraControls } from "components";
import { useField } from "scripts";
import { Figure as SceneFigure } from "scenes/2/Scene";
import { ResetScene } from ".";
import { prefix } from "..";

const WorldTransform = ({ children }) => {
  const [Syx] = useField<number>(`${prefix}Syx`);
  const [Szx] = useField<number>(`${prefix}Szx`);
  const [Sxy] = useField<number>(`${prefix}Sxy`);
  const [Szy] = useField<number>(`${prefix}Szy`);
  const [Sxz] = useField<number>(`${prefix}Sxz`);
  const [Syz] = useField<number>(`${prefix}Syz`);
  const prev = React.useRef({
    prevSyx: 0,
    prevSzx: 0,
    prevSxy: 0,
    prevSzy: 0,
    prevSxz: 0,
    prevSyz: 0,
  });

  const meshRef = useUpdate<THREE.Mesh>(
    (mesh) => {
      const { prevSyx, prevSzx, prevSxy, prevSzy, prevSxz, prevSyz } = prev.current;

      const reverseMatrix = new THREE.Matrix4();
      reverseMatrix.set(
        1,
        -prevSyx,
        -prevSzx,
        0,
        -prevSxy,
        1,
        -prevSzy,
        0,
        -prevSxz,
        -prevSyz,
        1,
        0,
        0,
        0,
        0,
        1,
      );
      mesh.applyMatrix4(reverseMatrix);

      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
      mesh.updateMatrix();

      prev.current = {
        prevSyx: Syx,
        prevSzx: Szx,
        prevSxy: Sxy,
        prevSzy: Szy,
        prevSxz: Sxz,
        prevSyz: Syz,
      };

      const matrix = new THREE.Matrix4();

      matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);

      mesh.applyMatrix4(matrix);
    },
    [Syx, Szx, Sxy, Szy, Sxz, Syz],
  );

  return <mesh ref={meshRef}>{children}</mesh>;
};

export const Figure = () => {
  const [scaleX] = useField<number>(`${prefix}scale-x`);
  const [scaleY] = useField<number>(`${prefix}scale-y`);

  const groupRef = useUpdate<THREE.Mesh>(
    (mesh) => {
      mesh.scale.x = scaleX;
      mesh.scale.y = scaleY;
    },
    [scaleX, scaleY],
  );

  return (
    <WorldTransform>
      <mesh ref={groupRef}>
        <Grid />
        <SceneFigure />
      </mesh>
    </WorldTransform>
  );
};

export const Scene = () => {
  return (
    <>
      <GridCameraControls />
      <Figure />

      <ResetScene />
    </>
  );
};
