import * as React from "react";

import { useField } from "scripts";
import { Grid } from "components";
import { ICurve, Curve } from "./Curve";
import { prefix } from "..";
import { Download } from "./Download";
import { DragContext } from "scripts/useDrag";

export const Controls = () => <Grid />;

export const Figure = () => {
  const [curves, setValue] = useField<ICurve[]>(`${prefix}curves`);

  return (
    <DragContext>
      <group>
        {curves?.map?.((curve, i) => (
          <Curve
            curve={curve}
            key={curve.id}
            onChange={(newCurve) => {
              setValue(
                curves.map((curv, ind) => {
                  if (i === ind) return newCurve;
                  return curv;
                }),
              );
            }}
          />
        ))}
      </group>
    </DragContext>
  );
};

const Scene: React.FC = () => (
  <>
    <Controls />
    <Figure />
    <Download />
  </>
);

export default Scene;
