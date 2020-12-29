import * as React from "react";

import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import textureUrl from "../figure-white.jpg";

const TextureMaterial = () => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  React.useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 4);
  }, [texture]);

  return <meshPhongMaterial attach="material" map={texture} />;
};

const Fallback = () => null;

export interface FigureProps {
  // extends THREE.Mesh
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  useTexture?: boolean;

  radius?: number;
  tube?: number;
  tubularSegments?: number;
  radialSegments?: number;
}
export const Figure: React.FC<FigureProps> = ({
  radius = 1.5,
  tube = 0.4,
  tubularSegments = 100,
  radialSegments = 16,
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1,
  useTexture = false,
  ...props
}) => {
  // This reference will give us direct access to the mesh
  const mesh = React.useRef<THREE.Mesh>();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <React.Suspense fallback={<Fallback />}>
      <mesh
        ref={mesh}
        position={[positionX, positionY, positionZ]}
        scale={[scaleX, scaleY, scaleZ]}
        {...props}
      >
        <torusKnotGeometry args={[radius, tube, tubularSegments, radialSegments]} />
        {useTexture ? <TextureMaterial /> : <meshNormalMaterial color="hotpink" />}
      </mesh>
    </React.Suspense>
  );
};
