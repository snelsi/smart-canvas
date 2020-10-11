import * as React from "react";

import { Slider } from "components";
import { OptionalGroup } from "./OptionalGroup";

export type MenuItemType = "slider" | "optional-group";
export interface MenuItemBase {
  type: MenuItemType;
  fieldName: string;
  title: string;
  defaultValue?: any;
  minValue?: number;
  maxValue?: number;
  step?: number;
}

export interface SliderItem extends MenuItemBase {
  type: "slider";
  defaultValue: number;
}
export interface OptionalGroupItem extends MenuItemBase {
  type: "optional-group";
  defaultValue: boolean;
  items: IMenuItem[];
}

export type IMenuItem = SliderItem | OptionalGroupItem;

interface MenuItemProps {
  item: IMenuItem;
  disabled?: boolean;
}
const MenuItemMemo: React.FC<MenuItemProps> = ({ item, ...props }) => {
  if (item?.type === "slider") return <Slider item={item} {...props} />;
  if (item?.type === "optional-group")
    return <OptionalGroup item={item as OptionalGroupItem} {...props} />;
  return null;
};
export const MenuItem = React.memo(MenuItemMemo);

interface MenuItemsProps {
  items: IMenuItem[];
  disabled?: boolean;
}
export const MenuItems: React.FC<MenuItemsProps> = ({ items, disabled = false }) => (
  <ul>
    {items?.map((item) => (
      <MenuItem key={item.fieldName} item={item} disabled={disabled} />
    ))}
  </ul>
);
