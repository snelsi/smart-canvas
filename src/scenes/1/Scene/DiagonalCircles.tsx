import React from "react";

import { useField } from "scripts";
import { Circle } from "components";

import { prefix } from "..";

const DiagonalCircles = () => {
  const [squareSideSize] = useField<number>(`${prefix}squareSideSize`);
  const [diagonalCircleRaduis] = useField<number>(`${prefix}diagonalCircleRaduis`);

  const shift = React.useMemo(() => Math.sqrt(squareSideSize / 2) / 2, [squareSideSize]);

  return (
    <>
      <Circle
        radius={diagonalCircleRaduis}
        shift={[shift, shift]}
        startAngle={135}
        endAngle={315}
      />
      <Circle
        radius={diagonalCircleRaduis}
        shift={[shift, -shift]}
        startAngle={225}
        endAngle={45}
      />
      <Circle
        radius={diagonalCircleRaduis}
        shift={[-shift, shift]}
        startAngle={45}
        endAngle={225}
      />
      <Circle
        radius={diagonalCircleRaduis}
        shift={[-shift, -shift]}
        startAngle={315}
        endAngle={135}
      />
    </>
  );
};

export default DiagonalCircles;
