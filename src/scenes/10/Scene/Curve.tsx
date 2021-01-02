import * as React from "react";

import * as THREE from "three";
import { ReactThreeFiber, useUpdate } from "react-three-fiber";
import { useField, useDebounce } from "scripts";
import { Point } from "./Point";
import { prefix } from "..";

export interface IPoint {
  x: number;
  y: number;
  z?: number;
}

const getPoint = (point1: IPoint, point2: IPoint, Percentage: number): IPoint => ({
  x: point1.x + ((point2.x - point1.x) * Percentage) / 100,
  y: point1.y + ((point2.y - point1.y) * Percentage) / 100,
  z: point1.z + ((point2.z - point1.z) * Percentage) / 100,
});
const getColor = (i: number) => {
  if (i % 3 === 2) return "#3374f6";
  if (i % 3 === 1) return "#f63933";
  return "#33f666";
};

export interface ICurve {
  id: number | string;
  points: IPoint[];
}
interface CurveProps {
  curve: ICurve;
  color?: ReactThreeFiber.Color;
  focusedColor?: ReactThreeFiber.Color;
  lineWidth?: number;
  onChange: (newCurve: ICurve) => void;
}
export const Curve: React.FC<CurveProps> = ({
  curve: passedCurve,
  color = 0xffffff,
  focusedColor = 0xff0000,
  lineWidth = 2,
  onChange,
}) => {
  const [curve, setCurve] = React.useState(passedCurve);
  const debouncedCurve = useDebounce(curve, 100);

  React.useEffect(() => {
    onChange(debouncedCurve);
  }, [debouncedCurve]);

  React.useEffect(() => {
    setCurve(passedCurve);
  }, [passedCurve]);

  const [focusedCurve] = useField<number | string>(`${prefix}focused-curve`);

  const focused = focusedCurve === curve?.id;

  const curvePoints = React.useMemo(() => {
    const points = [];

    for (let c = 0; c < curve.points.length - 1; c += 3) {
      for (let i = 0; i <= 100; i += 0.1) {
        const p1 = getPoint(curve.points[c], curve.points[c + 1], i);
        const p2 = getPoint(curve.points[c + 1], curve.points[c + 2], i);
        const p3 = getPoint(curve.points[c + 2], curve.points[c + 3], i);
        points.push(getPoint(getPoint(p1, p2, i), getPoint(p2, p3, i), i));
      }
    }

    return points;
  }, [curve.points]);

  const curveRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(curvePoints);
    },
    [curvePoints],
  );

  return (
    <group>
      <group>
        {curve.points.map((point, i) => (
          <Point
            key={i}
            position={[point.x, point.y, point.z]}
            color={getColor(i)}
            onDrag={(point) => {
              const curv = { ...curve };
              const points = curv.points.map((point) => ({ ...point })) as [
                IPoint,
                IPoint,
                IPoint,
                IPoint,
              ];

              const prevPoint = points[i];
              const newPoint = {
                x: point[0],
                y: point[1],
                z: point[2],
              };
              const diff = {
                x: newPoint.x - prevPoint.x,
                y: newPoint.y - prevPoint.y,
                z: newPoint.z - prevPoint.z,
              };
              points[i] = newPoint;

              // End points
              if (i === 0 || i === curve.points.length - 1) {
                setCurve((curCurv) => ({ ...curCurv, points }));
              }
              // Base point, move neighbors the same distance
              else if (i % 3 === 0) {
                points[i - 1] = {
                  x: points[i - 1].x + diff.x,
                  y: points[i - 1].y + diff.y,
                  z: points[i - 1].z + diff.z,
                };
                points[i + 1] = {
                  x: points[i + 1].x + diff.x,
                  y: points[i + 1].y + diff.y,
                  z: points[i + 1].z + diff.z,
                };
                setCurve((curCurv) => ({ ...curCurv, points }));
              }
              // Left pointer, mirror right pointer
              else if (i > 1 && i % 3 === 1) {
                points[i - 2] = {
                  x: points[i - 1].x + points[i - 1].x - points[i].x,
                  y: points[i - 1].y + points[i - 1].y - points[i].y,
                  z: points[i - 1].z + points[i - 1].z - points[i].z,
                };
                setCurve((curCurv) => ({ ...curCurv, points }));
              }
              // Right pointer, mirror left pointer
              else if (i < curve.points.length - 2 && i % 3 === 2) {
                points[i + 2] = {
                  x: points[i + 1].x + points[i + 1].x - points[i].x,
                  y: points[i + 1].y + points[i + 1].y - points[i].y,
                  z: points[i + 1].z + points[i + 1].z - points[i].z,
                };
                setCurve((curCurv) => ({ ...curCurv, points }));
              } else {
                setCurve((curCurv) => ({ ...curCurv, points }));
              }
            }}
          />
        ))}
      </group>

      <line>
        <lineBasicMaterial color={focused ? focusedColor : color} linewidth={lineWidth} />
        <bufferGeometry ref={curveRef} />
      </line>
    </group>
  );
};
