import * as React from "react";

import * as THREE from "three";
import { ReactThreeFiber, useUpdate } from "react-three-fiber";
import { StartPoint } from "./StartPoint";

interface EpicycloidProps {
  bigRadius?: number;
  smallRadius?: number;
  shift?: [number, number];
  color?: ReactThreeFiber.Color;
  lineWidth?: number;
  startAngle?: number;
  showVolume?: boolean;
  pointsLimit?: number;
}

const Epicycloid: React.FC<EpicycloidProps> = ({
  bigRadius: R = 1,
  smallRadius: r = 1,
  shift = [0, 0],
  color = 0xffffff,
  lineWidth = 1,
  startAngle = 0,
  showVolume = false,
  pointsLimit = 100000,
}) => {
  const [x, y] = shift;

  const epicycloidPoints = React.useMemo(() => {
    const points = [];
    let lastPoint;
    let theta = 0;
    let it = 0;

    const startX = (R + r) * Math.cos(theta) - r * Math.cos(((R + r) / r) * theta);
    const startY = (R + r) * Math.sin(theta) - r * Math.sin(((R + r) / r) * theta);
    const startZ = showVolume
      ? Math.sqrt((R + 2 * r) * (R + 2 * r) - startX * startX - startY * startY)
      : 0;

    const startPoint = {
      x: startX,
      y: startY,
      z: startZ,
    };

    points.push(new THREE.Vector3(startX, startY, startZ));

    theta += 0.1;

    do {
      const x = (R + r) * Math.cos(theta) - r * Math.cos(((R + r) / r) * theta);
      const y = (R + r) * Math.sin(theta) - r * Math.sin(((R + r) / r) * theta);
      const z = showVolume ? Math.sqrt((R + 2 * r) * (R + 2 * r) - x * x - y * y) : 0;

      lastPoint = {
        x,
        y,
        z,
      };

      points.push(new THREE.Vector3(x, y, z));

      theta += 0.1;
      it++;
    } while (
      (startPoint.x !== lastPoint.x ||
        startPoint.y !== lastPoint.y ||
        startPoint.z !== lastPoint.z) &&
      it < pointsLimit
    );

    return points;
  }, [R, r, x, y, showVolume, startAngle, pointsLimit]);

  const epicycloidRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(epicycloidPoints);
    },
    [epicycloidPoints],
  );

  return (
    <>
      <line>
        <lineBasicMaterial color={color} linewidth={lineWidth} />
        <bufferGeometry ref={epicycloidRef} />
      </line>
      <StartPoint x={R} y={0} />
    </>
  );
};

export default Epicycloid;
