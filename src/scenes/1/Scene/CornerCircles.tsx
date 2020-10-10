import React from "react";

import { useField } from "scripts";
import { Circle } from "components";

import { prefix } from "..";

const CornerCircles = () => {
  const [N] = useField<number>(`${prefix}squareSideSize`);
  const [cornerCircleRaduis] = useField<number>(`${prefix}cornerCircleRaduis`);

  const spaceFromCenter = React.useMemo(() => Math.sqrt(N / 2) - cornerCircleRaduis, [
    N,
    cornerCircleRaduis,
  ]);

  return (
    <>
      <Circle
        radius={cornerCircleRaduis}
        shift={[spaceFromCenter, 0]}
        startAngle={0}
        endAngle={180}
      />
      <Circle
        radius={cornerCircleRaduis}
        shift={[0, spaceFromCenter]}
        startAngle={270}
        endAngle={90}
      />
      <Circle
        radius={cornerCircleRaduis}
        shift={[-spaceFromCenter, 0]}
        startAngle={180}
        endAngle={0}
      />
      <Circle
        radius={cornerCircleRaduis}
        shift={[0, -spaceFromCenter]}
        startAngle={90}
        endAngle={270}
      />
    </>
  );
};

export default CornerCircles;
