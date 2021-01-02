import * as React from "react";
import styled from "@emotion/styled";

import { v4 as uuid } from "uuid";
import { MdAdd, MdClose, MdLockOutline } from "react-icons/md";
import Button from "components/Button";

import { useField, remove } from "scripts";
import { CubicCurveItem } from "./MenuItem";
import { ICurve } from "scenes/6/Scene/Curve";

const Wrapper = styled.div`
  color: var(--color-gray-70);
  margin: 1em 0;
  & .title {
    margin-bottom: 0.5em;
  }
  & .curves-controls {
    display: grid;
    gap: 8px;
  }
  & .add-new-btn {
    margin: 1em 0;
    width: 100%;
  }
`;

const CurveWrapper = styled.div`
  --shift: 5px;
  border: 1px solid transparent;
  border-radius: 5px;
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  overflow: hidden;

  padding: var(--shift) 0;

  &[data-focused="true"] {
    border-color: var(--color-primary);
  }
  & > button.concat-button,
  & > button.delete-button {
    &:not(:hover) {
      background: transparent;
    }
    border-radius: 4px;
    color: var(--color-gray-70);
    height: 32px;
    min-width: 32px;
    padding: 0;
    width: 100%;

    & > svg {
      height: 20px;
      width: 20px;
    }
  }

  & button:disabled {
    cursor: default !important;
    opacity: 0 !important;
  }
`;
interface CurveProps {
  curve: ICurve;
  i?: string | number;
  onChange: (newValue: ICurve) => void;
  onConcat?: () => void;
}
const Curve: React.FC<CurveProps> = ({ curve, onChange, onConcat, i }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  if (!curve) return null;

  const deleteCurve = () => onChange(null);

  return (
    <CurveWrapper ref={wrapperRef}>
      <div>{i}</div>
      <Button className="concat-button" onClick={onConcat} disabled={!onConcat}>
        <MdLockOutline />
      </Button>
      <Button className="delete-button" onClick={deleteCurve}>
        <MdClose />
      </Button>
    </CurveWrapper>
  );
};

interface CubicCurvePointsProps {
  item: CubicCurveItem;
}
export const CubicCurvePoints: React.FC<CubicCurvePointsProps> = ({
  item: { title = "", fieldName, defaultValue },
}) => {
  const [curves, setValue] = useField<ICurve[]>(fieldName, defaultValue);

  const createNewCurve = React.useCallback(() => {
    const newCurve: ICurve = {
      id: uuid(),
      points: [
        {
          x: -3,
          y: 0,
          z: 0,
        },
        {
          x: -3,
          y: 3,
          z: 0,
        },
        {
          x: 3,
          y: 3,
          z: 0,
        },
        {
          x: 3,
          y: 0,
          z: 0,
        },
      ],
    };
    setValue([...curves, newCurve]);
  }, [curves]);

  return (
    <Wrapper>
      <div className="title">{title}</div>
      <div className="curves-controls">
        {curves?.map((curve, i) => (
          <Curve
            key={curve.id}
            i={i}
            curve={curve}
            onChange={(newCurv) => {
              if (!newCurv) {
                setValue(remove(curves, i));
              } else {
                const newState = curves.map((curve) => ({ ...curve })) || [];
                newState[i] = newCurv;
                setValue(newState);
              }
            }}
            onConcat={
              i > 0
                ? () => {
                    let newState = curves.map((curve) => ({ ...curve })) || [];
                    const [preLastPoint, lastPoint] = newState[i - 1].points.slice(-2);
                    const [diffX, diffY, diffZ] = [
                      lastPoint.x - preLastPoint.x,
                      lastPoint.y - preLastPoint.y,
                      lastPoint.z - preLastPoint.z,
                    ];
                    newState[i - 1].points = newState[i - 1].points
                      .concat({
                        x: lastPoint.x + diffX,
                        y: lastPoint.y + diffY,
                        z: lastPoint.z + diffZ,
                      })
                      .concat(newState[i].points.slice(2));
                    newState.splice(i, 1);
                    console.clear();
                    console.log(newState);
                    setValue(newState);
                  }
                : undefined
            }
          />
        ))}
      </div>
      <Button onClick={createNewCurve} className="add-new-btn" data-icon>
        <MdAdd />
      </Button>
    </Wrapper>
  );
};
