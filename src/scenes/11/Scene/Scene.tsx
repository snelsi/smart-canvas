import * as React from "react";
import * as THREE from "three";
import { VertexNormalsHelper } from "three-stdlib";
import { createPortal, useFrame } from "@react-three/fiber";
import { Environment, useFBO, PerspectiveCamera, Parametric, useHelper } from "@react-three/drei";
import Epicycloid from "scenes/5/Scene/Epicycloid";

import { useField } from "scripts";
import { Circle, CameraControls } from "components";
import { prefix } from "..";

export const Controls = () => (
  <>
    <axesHelper args={[100]} />
    <CameraControls />
  </>
);

const Env = () => {
  const [preset] = useField<string>(`${prefix}preset`);
  return (
    <React.Suspense fallback={null}>
      <Environment
        preset={preset === "none" ? "sunset" : preset}
        background={preset && preset !== "none"}
      />
    </React.Suspense>
  );
};

const Cardioid = () => {
  const [R] = useField<number>(`${prefix}big-radius`);
  const [r] = useField<number>(`${prefix}small-radius`);

  return (
    <group>
      <Circle radius={R} color={0x0000ff} />
      <Epicycloid bigRadius={R} smallRadius={r} color={0xff0000} />
    </group>
  );
};

const useTexture = () => {
  const [color] = useField<string>(`${prefix}color`);

  const [showTexture] = useField<number>(`${prefix}show-texture`);
  const [animation] = useField<number>(`${prefix}texture-animation`);
  const cam = React.useRef<THREE.Camera>(null);
  const scene = React.useMemo(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(color);
    return scene;
  }, [color]);
  const target = useFBO();

  const [valueX] = useField<number>(`${prefix}tex-x-position`);
  const [valueY] = useField<number>(`${prefix}tex-y-position`);

  useFrame((state) => {
    if (showTexture) {
      if (cam.current) {
        cam.current.position.x = valueX;
        cam.current.position.y = valueY;
        if (animation) {
          cam.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2;
        }
      }
    }
    try {
      state.gl.setRenderTarget(target);
      state.gl.render(scene, cam.current);
      state.gl.setRenderTarget(null);
    } catch {}
  });

  return {
    target,
    renderer: (
      <>
        <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
        {showTexture && createPortal(<Cardioid />, scene)}
      </>
    ),
  };
};

const Light = () => {
  const [posX] = useField<number>(`${prefix}x-position`);
  const [posY] = useField<number>(`${prefix}y-position`);
  const [posZ] = useField<number>(`${prefix}z-position`);
  const [showLight] = useField<string>(`${prefix}show-light`);
  const [lightColor] = useField<string>(`${prefix}lightColor`);
  const [lightIntensity] = useField<number>(`${prefix}lightIntensity`);

  if (!showLight) return null;
  return <spotLight args={[lightColor, lightIntensity]} position={[posX, posY, posZ]} />;
};

const Drop = ({ map, wireframe = false }) => {
  const [segments1] = useField<number>(`${prefix}segments1`);
  const [segments2] = useField<number>(`${prefix}segments2`);

  const [metalness] = useField<number>(`${prefix}metalness`);
  const [roughness] = useField<number>(`${prefix}roughness`);
  const [showHelpers] = useField<number>(`${prefix}showHelpers`);

  const [a] = useField<number>(`${prefix}a`);
  const [b] = useField<number>(`${prefix}b`);

  const uvFunction = React.useCallback(
    (up: number, vp: number, target?: THREE.Vector3) => {
      // const u = -Math.PI / 2 + up * Math.PI;
      const u = up * 2 * Math.PI;
      const v = -Math.PI / 2 + vp * Math.PI;

      const r = a * (1 - Math.sin(v)) * Math.cos(v);

      const x = Math.sin(u) * r;
      const y = Math.cos(u) * r;

      const z = -b * (Math.sin(v) - 1);

      target.set(x, y, z);
    },
    [a, b],
  );

  const meshRef = React.useRef();
  useHelper(
    showHelpers ? meshRef || { current: null } : { current: null },
    VertexNormalsHelper,
    1,
    "red",
  );

  return (
    <Parametric ref={meshRef} args={[uvFunction, segments1, segments2]}>
      <meshStandardMaterial
        attach="material"
        metalness={metalness}
        roughness={roughness}
        color="#f3f3f3"
        map={map}
        wireframe={wireframe}
      />
    </Parametric>
  );
};

export const Figure = () => {
  const { target, renderer } = useTexture();
  return (
    <>
      <Env />
      {renderer}
      <Drop map={target?.texture} />
      <Light />
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
