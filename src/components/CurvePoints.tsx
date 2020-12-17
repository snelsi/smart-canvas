import * as React from "react";
import styled from "@emotion/styled";

import { Input } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { MdAdd } from "react-icons/md";
import Button from "components/Button";

import { useField, useClickOutside, isNumber } from "scripts";
import { CurveItem } from "./MenuItem";
import { ICurve, IPoint } from "scenes/6/Scene/Curve";

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

interface CellProps {
  value: number;
  onChange: (newValue: number) => void;
  onFocus?: () => void;
}
const Cell: React.FC<CellProps> = React.memo(({ value, onChange, onFocus }) => {
  const [inputValue, setInputValue] = React.useState<string | number>(value);

  React.useEffect(() => {
    if (inputValue !== value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <Input
      type="number"
      inputMode="decimal"
      value={value}
      onChange={(e) => {
        const { value } = e.target;
        setInputValue(value);
        if (isNumber(value)) {
          const num = Number(value);
          onChange(num);
        }
      }}
      variant="filled"
      className="point-cell"
      onFocus={onFocus}
    />
  );
});

const PointWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 6px;
  overflow: hidden;

  & > input.point-cell {
    align-items: center;
    background-color: var(--color-gray-30);
    border-radius: 4px;
    color: var(--color-gray-70);
    display: inline-flex;
    justify-content: center;
    text-align: center;
    padding: 0;
    height: 32px;
    width: 100%;
  }
`;
interface PointProps {
  point: IPoint;
  onChange: (newValue: number, coord: "x" | "y" | "z") => void;
  onFocus?: () => void;
}
const PointConrols: React.FC<PointProps> = React.memo(({ point, onChange, onFocus }) => (
  <PointWrapper>
    <Cell value={point?.x} onChange={(num) => onChange(num, "x")} onFocus={onFocus} />
    <Cell value={point?.y} onChange={(num) => onChange(num, "y")} onFocus={onFocus} />
  </PointWrapper>
));

const CurveWrapper = styled.div`
  --shift: 5px;
  border: 1px solid transparent;
  border-radius: 5px;
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  overflow: hidden;

  padding: var(--shift);
  margin: -var(--shift);

  &[data-focused="true"] {
    border-color: var(--color-primary);
  }
`;
interface CurveProps {
  curve: ICurve;
  onChange: (newValue: ICurve) => void;
}
const Curve: React.FC<CurveProps> = ({ curve, onChange }) => {
  const [focus, setFocused] = useField<number | string>("6-focused-curve");

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setFocused(null));

  if (!curve) return null;

  const updateCurCurve = React.useCallback(
    (value, i, d): ICurve => {
      let points = (curve.points?.map((point) => ({ ...point })) || []) as [IPoint, IPoint, IPoint];
      points[i][d] = value;

      return {
        ...curve,
        points,
      };
    },
    [curve.points],
  );

  const focused = focus === curve.id;
  const focusCurve = React.useCallback(() => setFocused(curve.id), [curve.id]);

  return (
    <CurveWrapper data-focused={focused} ref={wrapperRef}>
      <PointConrols
        point={curve.points?.[0]}
        onChange={(num, coord) => onChange(updateCurCurve(num, "0", coord))}
        onFocus={focusCurve}
      />
      <PointConrols
        point={curve.points?.[1]}
        onChange={(num, coord) => onChange(updateCurCurve(num, "1", coord))}
        onFocus={focusCurve}
      />
      <PointConrols
        point={curve.points?.[2]}
        onChange={(num, coord) => onChange(updateCurCurve(num, "2", coord))}
        onFocus={focusCurve}
      />
    </CurveWrapper>
  );
};

interface CurvePointsProps {
  item: CurveItem;
}
export const CurvePoints: React.FC<CurvePointsProps> = ({
  item: { title = "", fieldName, defaultValue },
}) => {
  const [curves, setValue] = useField<ICurve[]>(fieldName, defaultValue);
  const [, setFocused] = useField<number | string>("6-focused-curve");

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
          x: 0,
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
    setFocused(newCurve.id);
  }, [curves]);

  return (
    <Wrapper>
      <div className="title">{title}</div>
      <div className="curves-controls">
        {curves?.map((curve, i) => (
          <Curve
            key={curve.id}
            curve={curve}
            onChange={(newCurv) => {
              const newState = curves.map((curve) => ({ ...curve })) || [];
              newState[i] = newCurv;
              setValue(newState);
            }}
          />
        ))}
      </div>
      <Button onClick={createNewCurve} className="add-new-btn">
        <MdAdd />
      </Button>
    </Wrapper>
  );
};
