import * as React from "react";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import textureUrl from "../figure-white.jpg";

const TextureMaterial = () => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  React.useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  }, [texture]);

  return <meshPhongMaterial attach="material" map={texture} />;
};

const Fallback = () => null;

export interface LatheFigureProps {
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  useTexture?: boolean;
}
export const LatheFigure: React.FC<LatheFigureProps> = ({
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1,
  useTexture = false,
  ...props
}) => {
  const geometry = React.useMemo(() => {
    const shape = new THREE.Shape();
    const x = positionX;
    const y = positionY;
    // shape.moveTo(x + 2.5, y - 2.5);
    // shape.bezierCurveTo(x + 2.5, y - 2.5, x + 2, y, x, y);
    // shape.bezierCurveTo(x - 3, y, x - 3, y - 3.5, x - 3, y - 3.5);
    // shape.bezierCurveTo(x - 3, y - 5.5, x - 1.5, y - 7.7, x + 2.5, y - 9.5);
    // shape.bezierCurveTo(x + 6, y - 7.7, x + 8, y - 4.5, x + 8, y - 3.5);
    // shape.bezierCurveTo(x + 8, y - 3.5, x + 8, y, x + 5, y);
    // shape.bezierCurveTo(x + 3.5, y, x + 2.5, y - 2.5, x + 2.5, y - 2.5);
    shape.moveTo(x + 2.5, y - 2.5);
    shape.bezierCurveTo(x + 2.5, y - 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y - 3.5, x - 3, y - 3.5);
    shape.bezierCurveTo(x - 3, y - 5.5, x - 1.5, y - 7.7, x + 2.5, y - 9.5);
    shape.bezierCurveTo(x + 6, y - 7.7, x + 8, y - 4.5, x + 8, y - 3.5);
    shape.bezierCurveTo(x + 8, y - 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y - 2.5, x + 2.5, y - 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2,
    };

    return new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  }, [positionX, positionY, positionZ]);

  return (
    <React.Suspense fallback={<Fallback />}>
      <mesh
        geometry={geometry}
        position={[positionX, positionY, positionZ]}
        scale={[scaleX, scaleY, scaleZ]}
        {...props}
      >
        {useTexture ? <TextureMaterial /> : <meshNormalMaterial color="hotpink" />}
      </mesh>
    </React.Suspense>
  );
};
