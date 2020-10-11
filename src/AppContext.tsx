import create from "zustand";

import produce from "immer";

const defaultFields = {
  "1-squareSideSize": 36,
  "1-innerCircleRaduis": 1,
  "1-outterCircleRaduis": 1.5,
  "1-cornerCircleRaduis": 1,
  "1-diagonalCircleRaduis": 1.2,
  "2-scale": 1,
  "2-x-position": 0,
  "2-y-position": 0,
  "2-rotation": 0,
  "2-z-position": 0,
  "2-x-rotation": 0,
  "2-y-rotation": 0,
  "3-angle": 90,
  "3-Syx": 0,
  "3-Szx": 0,
  "3-Sxy": 0,
  "3-Szy": 0,
  "3-Sxz": 0,
  "3-Syz": 0,
  "3-rotation-x": 1,
  "3-rotation-y": 1,
  "4-twist": 1,
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type storeProps = {
  fields: {
    [key: string]: any;
  };
  set: (func: (state: storeProps) => any) => void;
};
export const useStore = create<storeProps>((set) => ({
  fields: defaultFields,
  set: (fn) => set(produce(fn)),
}));
