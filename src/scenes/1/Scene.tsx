import React from "react";

import { Box } from "components";
import { useField } from "scripts";

import { prefix } from ".";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

const points = [];
// points.push(new Vector3(-10, 0, 0));
// points.push(new Vector3(0, 10, 0));
// points.push(new Vector3(10, 0, 0));
points.push([-10, 0, 0]);
points.push([0, 10, 0]);
points.push([20, 0, 0]);

const getGeometry = () => new THREE.BufferGeometry().setFromPoints(points);

interface ExtrusionProps extends THREE.ExtrudeGeometryOptions {
  start: [number, number];
  paths: [number, number, number, number, number, number][];
  amount: number;
}
function Extrusion({ start = [0, 0], paths, ...props }: ExtrusionProps) {
  const shape = React.useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(...start);
    paths.forEach((path) => shape.bezierCurveTo(...path));
    return shape;
  }, [start, paths]);

  return (
    <mesh>
      <extrudeGeometry attach="geometry" args={[shape, props]} />
      <meshPhongMaterial attach="material" />
    </mesh>
  );
}

export interface TorusProps {
  // extends THREE.Mesh
  position?: [number, number, number];
  scale?: [number, number, number];
}
export const Torus: React.FC<TorusProps> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = React.useRef<THREE.Mesh>();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} {...props}>
      <torusKnotGeometry attach="geometry" args={[1.5, 0.2, 100, 16]} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

export const Scene = () => {
  const [valueX] = useField<number>(`${prefix}squareSideSize`);
  const [valueY] = useField<number>(`${prefix}innerCircleRaduis`);

  return (
    <>
      <camera position={[0, 0, 50]} />

      <Torus />

      {/* <Box position={[-1.2, 0, 0]} scale={[1, 1, 1]} /> */}

      {/* <camera position={[0, 0, 100]} lookAt={new THREE.Vector3(0, 0, 0)} /> */}
      {/* <line>
        <lineBasicMaterial attach="material" color={0xffffff} />
        <bufferGeometry
          attach="geometry"
          setFromPoints={[
            [-10, 0, 0],
            [0, 10, 0],
            [10, 0, 0],
          ].map((points) => new THREE.Vector3(...points))}
        />
      </line> */}
    </>
  );
};
