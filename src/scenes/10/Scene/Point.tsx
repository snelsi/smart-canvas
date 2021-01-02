import * as React from "react";

import { ReactThreeFiber } from "react-three-fiber";
import { useHover, useDrag, round } from "scripts";

interface PointProps {
  position: ReactThreeFiber.Vector3;
  color?: ReactThreeFiber.Color;
  onDrag?: (v: any) => void;
  onEnd?: (v: any) => void;
}
export const Point: React.FC<PointProps> = React.memo(
  ({ position, color = 0xffffff, onDrag, onEnd }) => {
    const [bindHover, hovered] = useHover();
    const bindDrag = useDrag((e) => {
      if (onDrag) {
        const cameraPosition = e.camera.position.toArray();
        const pointPosition = e.unprojectedPoint.toArray();
        const diff = [
          cameraPosition[0] - pointPosition[0],
          cameraPosition[1] - pointPosition[1],
          cameraPosition[2] - pointPosition[2],
        ];
        const proj = pointPosition[2] / diff[2];
        const projectedPoint = [
          round(pointPosition[0] - diff[0] * proj, 100),
          round(pointPosition[1] - diff[1] * proj, 100),
          0,
        ];
        onDrag(projectedPoint);
      }
    }, onEnd);

    let bindings = {};
    if (onDrag) {
      bindings = { ...bindDrag };
    }
    return (
      <mesh position={position} {...bindings} {...bindHover}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshBasicMaterial color={hovered ? "hotpink" : color} />
      </mesh>
    );
  },
);
