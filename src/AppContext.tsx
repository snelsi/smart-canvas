import create from "zustand";

import produce from "immer";
import { MenuItem } from "components";

import { scene as scene1 } from "./scenes/1";
import { scene as scene2 } from "./scenes/2";

const menuItemsToObject = (acc: object, { fieldName, defaultValue }: MenuItem) => {
  acc[fieldName] = defaultValue;
  return acc;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type storeProps = {
  fields: {
    [key: string]: any;
  };
  set: (func: (state: storeProps) => any) => void;
};
export const useStore = create<storeProps>((set) => ({
  fields: {
    ...scene1.menuItems.reduce(menuItemsToObject, {}),
    ...scene2.menuItems.reduce(menuItemsToObject, {}),
  },
  set: (fn) => set(produce(fn)),
}));
