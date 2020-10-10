import React from "react";

import { useField } from "scripts";
import { Circle } from "components";

import { prefix } from "..";

const CentralCircle = () => {
  const [innerCircleRaduis] = useField<number>(`${prefix}innerCircleRaduis`);
  const [outterCircleRaduis] = useField<number>(`${prefix}outterCircleRaduis`);

  return (
    <>
      <Circle radius={innerCircleRaduis} />
      <Circle radius={outterCircleRaduis} />
    </>
  );
};

export default CentralCircle;
