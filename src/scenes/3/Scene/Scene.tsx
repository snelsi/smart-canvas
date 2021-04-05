import React from "react";

import * as THREE from "three";

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

  const meshRef = React.useRef<THREE.Mesh>();
  React.useLayoutEffect(() => {
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
    meshRef.current?.applyMatrix4(reverseMatrix);

    meshRef.current?.position.set(0, 0, 0);
    meshRef.current?.rotation.set(0, 0, 0);
    meshRef.current?.scale.set(1, 1, 1);
    meshRef.current?.updateMatrix();

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

    meshRef.current?.applyMatrix4(matrix);
  }, [Syx, Szx, Sxy, Szy, Sxz, Syz]);

  return <mesh ref={meshRef}>{children}</mesh>;
};

export const Figure = () => {
  const [scaleX] = useField<number>(`${prefix}scale-x`);
  const [scaleY] = useField<number>(`${prefix}scale-y`);

  const groupRef = React.useRef<THREE.Mesh>();
  React.useLayoutEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.x = scaleX;
      groupRef.current.scale.y = scaleY;
    }
  }, [scaleX, scaleY]);

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
