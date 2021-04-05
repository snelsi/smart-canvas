import * as React from "react";

import { degToRad } from "scripts";
import { Grid } from "components";
import * as THREE from "three";

interface RenderSideProps {
  rotation?: THREE.Euler | [number, number, number];
  planeRotation?: [number, number, number];
  planePosition?: [number, number, number];
}

export const RenderSide: React.FC<RenderSideProps> = ({
  rotation = [0, 0, 0],
  planeRotation = [0, 0, 0],
  planePosition = [0, 0, 0],
}) => {
  const meshRef = React.useRef<THREE.Mesh>();
  React.useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = degToRad(planeRotation[0]);
      meshRef.current.rotation.y = degToRad(planeRotation[1]);
      meshRef.current.rotation.z = degToRad(planeRotation[2]);
      meshRef.current.position.x = planePosition[0];
      meshRef.current.position.y = planePosition[1];
      meshRef.current.position.z = planePosition[2];
    }
  }, [planeRotation, planePosition]);

  return (
    <>
      <Grid rotation={rotation} />
      <mesh ref={meshRef}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshBasicMaterial attach="material" color="#383838" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};
