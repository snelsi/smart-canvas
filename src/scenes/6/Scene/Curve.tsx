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
  if (i === 2) return "#3374f6";
  if (i === 1) return "#f63933";
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

    for (let i = 0; i <= 100; i += 0.1) {
      points.push(
        getPoint(
          getPoint(curve.points[0], curve.points[1], i),
          getPoint(curve.points[1], curve.points[2], i),
          i,
        ),
      );
    }

    return points;
  }, [curve.points]);

  const curveRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(curvePoints);
    },
    [curvePoints],
  );

  const showPoints = focused;

  return (
    <group>
      <group visible={showPoints}>
        {curve.points.map((point, i) => (
          <Point
            key={i}
            position={[point.x, point.y, point.z]}
            color={getColor(i)}
            onDrag={
              showPoints
                ? (point) => {
                    const curv = { ...curve };
                    const points = curv.points.map((point) => ({ ...point })) as [
                      IPoint,
                      IPoint,
                      IPoint,
                    ];

                    points[i] = {
                      x: point[0],
                      y: point[1],
                      z: point[2],
                    };
                    setCurve((curCurv) => ({ ...curCurv, points }));
                  }
                : undefined
            }
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
