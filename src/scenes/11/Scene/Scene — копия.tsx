import * as React from "react";
import * as THREE from "three";
import { VertexNormalsHelper } from "three-stdlib";
import { createPortal, useFrame } from "@react-three/fiber";
import {
  Environment,
  TorusKnot,
  useFBO,
  Box,
  PerspectiveCamera,
  Lathe,
  useHelper,
} from "@react-three/drei";

import { useField, getPointRecursive } from "scripts";
import { CameraControls } from "components";
import { prefix } from "..";

export const Controls = () => (
  <>
    <axesHelper args={[100]} />
    <CameraControls />
  </>
);

const SpinningThing = () => {
  const mesh = React.useRef<THREE.Mesh>(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.01;
  });
  return (
    <TorusKnot ref={mesh} args={[1, 0.4, 100, 64]}>
      <meshNormalMaterial attach="material" />
    </TorusKnot>
  );
};

function UseFBOScene({ color = "orange", ...props }) {
  const cam = React.useRef<THREE.Camera>(null!);
  const scene = React.useMemo(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(color);
    return scene;
  }, [color]);
  const target = useFBO(props);

  useFrame((state) => {
    cam.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2;
    state.gl.setRenderTarget(target);
    state.gl.render(scene, cam.current);
    state.gl.setRenderTarget(null);
  });

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
      {createPortal(<SpinningThing />, scene)}
      <Box args={[3, 3, 3]}>
        <meshStandardMaterial attach="material" map={target.texture} />
      </Box>
    </>
  );
}

const curve = [
  { x: 2, y: 0 },
  { x: 2.2, y: 0.4 },
  { x: 2.8, y: 1 },
  { x: 4, y: 1.6 },
  { x: 2.8, y: 2.6 },
  { x: 1.5, y: 3.8 },
];

export const Figure = () => {
  const [preset] = useField<string>(`${prefix}preset`);
  const [segments] = useField<number>(`${prefix}segments`);
  const [color] = useField<string>(`${prefix}color`);

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

  return (
    <>
      <React.Suspense fallback={null}>
        <Environment preset={preset} background />
      </React.Suspense>
      {/* <mesh>
        <torusKnotBufferGeometry args={[1, 0.5, 128, 32]} />
        <meshStandardMaterial metalness={1} roughness={0} />
      </mesh> */}
      <UseFBOScene />
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
