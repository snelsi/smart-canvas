import * as React from "react";
import * as THREE from "three";
import { VertexNormalsHelper } from "three-stdlib";
import { Environment, Lathe, useHelper } from "@react-three/drei";

import { useField, degToRad, getPointRecursive } from "scripts";
import { CameraControls } from "components";
import { prefix } from "..";

export const Controls = () => (
  <>
    <axesHelper args={[10]} />
    <CameraControls />
  </>
);

const curve = [
  { x: 3.4, y: 0 },
  { x: 2.2, y: 0.5 },
  { x: 2.8, y: 1 },
  { x: 3, y: 2 },
  { x: 2.8, y: 2.6 },
  { x: 1.8, y: 3.5 },
];

export const Figure = () => {
  const [preset] = useField<string>(`${prefix}preset`);
  const [segments] = useField<number>(`${prefix}segments`);
  const [phiStart] = useField<number>(`${prefix}phiStart`);
  const [phiLength] = useField<number>(`${prefix}phiLength`);
  const [color] = useField<string>(`${prefix}color`);
  const [showHelpers] = useField<boolean>(`${prefix}showHelpers`);

  const [scale] = useField<number>(`${prefix}scale`);
  const [valueX] = useField<number>(`${prefix}x-position`);
  const [valueY] = useField<number>(`${prefix}y-position`);
  const [valueZ] = useField<number>(`${prefix}z-position`);
  const [rotationX] = useField<number>(`${prefix}x-rotation`);
  const [rotationY] = useField<number>(`${prefix}y-rotation`);
  const [rotationZ] = useField<number>(`${prefix}z-rotation`);
  const [k] = useField<number>(`${prefix}k`);

  const mesh = React.useRef<THREE.Mesh>();

  const points = React.useMemo(() => {
    const _points: THREE.Vector2[] = [];

    for (let i = 0; i <= k; i += 1) {
      const percent = (i / k) * 100;
      const [p] = getPointRecursive(curve, percent);
      _points.push(new THREE.Vector2(p.x, p.y));
    }

    return _points;
  }, [curve, k]);

  useHelper(showHelpers ? mesh : { current: null }, THREE.BoxHelper, "royalblue");
  useHelper(showHelpers ? mesh : { current: null }, VertexNormalsHelper, 1, "red");

  const position = React.useMemo(() => new THREE.Vector3(valueX, valueY, valueZ), [
    valueX,
    valueY,
    valueZ,
  ]);
  const rotation = React.useMemo(
    () => new THREE.Euler(degToRad(rotationX), degToRad(rotationY), degToRad(rotationZ)),
    [rotationX, rotationY, rotationZ],
  );

  return (
    <>
      <React.Suspense fallback={null}>
        <Environment
          preset={preset === "none" ? "sunset" : preset}
          background={preset && preset !== "none"}
        />
      </React.Suspense>
      <Lathe
        ref={mesh}
        args={[points, segments, degToRad(phiStart), degToRad(phiLength)]}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <meshStandardMaterial
          metalness={0.2}
          roughness={0.2}
          side={THREE.DoubleSide}
          color={color}
        />
      </Lathe>
    </>
  );
};

const Scene: React.FC = () => (
  <>
    <Controls />
    <Figure />
  </>
);

export default Scene;
