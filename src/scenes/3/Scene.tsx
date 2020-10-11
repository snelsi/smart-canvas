import React from "react";

import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

import { Grid, GridCameraControls } from "components";
import { useField } from "scripts";
import { Figure as SceneFigure } from "../2/Scene";
import { prefix } from ".";

const WorldTransform = ({ children }) => {
  const [Syx] = useField<number>(`${prefix}Syx`);
  const [Szx] = useField<number>(`${prefix}Szx`);
  const [Sxy] = useField<number>(`${prefix}Sxy`);
  const [Szy] = useField<number>(`${prefix}Szy`);
  const [Sxz] = useField<number>(`${prefix}Sxz`);
  const [Syz] = useField<number>(`${prefix}Syz`);
  const SyxRef = React.useRef<number>(0);
  const SzxRef = React.useRef<number>(0);
  const SxyRef = React.useRef<number>(0);
  const SzyRef = React.useRef<number>(0);
  const SxzRef = React.useRef<number>(0);
  const SyzRef = React.useRef<number>(0);

  const geometryRef = useUpdate<THREE.BoxGeometry>(
    (geometry) => {
      const prevSyx = SyxRef.current;
      const prevSzx = SzxRef.current;
      const prevSxy = SxyRef.current;
      const prevSzy = SzyRef.current;
      const prevSxz = SxzRef.current;
      const prevSyz = SyzRef.current;

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
      geometry.applyMatrix4(reverseMatrix);

      SyxRef.current = Syx;
      SzxRef.current = Szx;
      SxyRef.current = Sxy;
      SzyRef.current = Szy;
      SxzRef.current = Sxz;
      SyzRef.current = Syz;

      const matrix = new THREE.Matrix4();

      matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);

      geometry.applyMatrix4(matrix);
    },
    [Syx, Szx, Sxy, Szy, Sxz, Syz],
  );

  return (
    <mesh>
      <boxGeometry ref={geometryRef} />
      <meshBasicMaterial wireframe={true} />
      {children}
    </mesh>
  );
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
    </>
  );
};
