import * as React from "react";

import * as THREE from "three";
import { useUpdate } from "react-three-fiber";
import { degToRad } from "scripts";

export interface IPoint {
  x: number;
  y: number;
  z?: number;
}

const memoize = (fn: (...par: any[]) => any) => {
  const cachedResults = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cachedResults[key]) {
      cachedResults[key] = fn(...args);
    }
    return cachedResults[key];
  };
};

const getTurtle = memoize((depth = 1) => {
  if (depth <= 0) {
    return "FX";
  }

  const turtle = getTurtle(depth - 1);
  let newTurtle = "";

  [...turtle].forEach((char) => {
    if (char === "X") {
      newTurtle += "X+YF+";
    } else if (char === "Y") {
      newTurtle += "-FX-Y";
    } else {
      newTurtle += char;
    }
  });

  return newTurtle;
});

const convertCos = memoize(
  ({ lineLength = 1, direction = 0 }) => lineLength * Math.cos(direction * 0.017453292519),
);
const convertSin = memoize(
  ({ lineLength = 1, direction = 0 }) => lineLength * Math.sin(direction * 0.017453292519),
);

const getLine = memoize(
  ({
    turtle = "",
    rotation = 0,
    startX = 0,
    startY = 0,
    lineLength = 1,
    showVolume = false,
  } = {}) => {
    if (!turtle) return [];

    let direction = rotation;
    let x = startX;
    let y = startY;

    const dots = [new THREE.Vector3(x, y, 0)];

    [...turtle].forEach((char, i) => {
      // 'F', draw forward length in direction
      if (char === "F") {
        const xFix = convertCos({ lineLength, direction });
        const yFix = convertSin({ lineLength, direction });

        const endx = x + xFix;
        const endy = y + yFix;

        dots.push(new THREE.Vector3(endx, endy, showVolume ? i / 1000 : 0));

        x = endx;
        y = endy;
      }
      // '-' add 90 degrees to direction
      else if (char === "-") {
        direction += 90;
      }
      // '+' subtract 90 degrees from direction
      else if (char === "+") {
        direction -= 90;
      }
    });

    return dots;
  },
);

interface CurveProps {
  depth: number;
  lineWidth?: number;
  lineLength?: number;
  startX?: number;
  startY?: number;
  rotation?: number;
  showVolume?: boolean;
  showColor?: boolean;
}
export const Curve: React.FC<CurveProps> = ({
  depth = 1,
  lineWidth = 2,
  lineLength: scale = 1,
  startX = 0,
  startY = 0,
  rotation = 0,
  showVolume = false,
  showColor = false,
}) => {
  const turtle: string = React.useMemo(() => getTurtle(depth) || null, [depth]);
  const lines: [THREE.Vector3] = React.useMemo(() => getLine({ turtle, showVolume }), [
    turtle,
    showVolume,
  ]);

  const meshRef = useUpdate<THREE.Mesh>(
    (geometry) => {
      geometry.scale.x = scale;
      geometry.scale.y = scale;
      geometry.scale.z = scale;

      geometry.position.x = startX;
      geometry.position.y = startY;
      geometry.rotation.z = degToRad(rotation);
    },
    [scale, startX, startY, rotation],
  );

  const colors = React.useMemo(() => {
    const color = new THREE.Color();

    const colors = [];
    const max = 1000;

    for (let i = 0; i < lines.length; i++) {
      if (showColor) {
        if (lines.length > max) {
          color.setHSL(i / max, 1.0, 0.5);
        } else {
          color.setHSL(i / lines.length, 1.0, 0.5);
        }
        colors.push(color.r, color.g, color.b);
      } else {
        colors.push(255, 255, 255);
      }
    }

    return colors;
  }, [lines.length, showColor]);

  const geometryRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(lines);
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    },
    [lines, colors],
  );

  return (
    <mesh ref={meshRef}>
      <line>
        <lineBasicMaterial vertexColors linewidth={lineWidth} />
        <bufferGeometry ref={geometryRef} />
      </line>
    </mesh>
  );
};
