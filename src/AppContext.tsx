import create from "zustand";

import produce from "immer";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type storeProps = {
  fields: {
    [key: string]: any;
  };
  set: (func: (state: storeProps) => any) => void;
};
export const useStore = create<storeProps>((set) => ({
  fields: {},
  set: (fn) => set(produce(fn)),
}));
