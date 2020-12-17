import * as React from "react";

import { Slider } from "components";
import { Group } from "./Group";
import { Switcher } from "./Switcher";
import { OptionalGroup } from "./OptionalGroup";
import { Action } from "./Action";
import { DoubleAction } from "./DoubleAction";
import { DoubleInputAction } from "./DoubleInputAction";
import { CurvePoints } from "./CurvePoints";

export type MenuItemType =
  | "slider"
  | "group"
  | "switcher"
  | "optional-group"
  | "action"
  | "double-action"
  | "double-input-action"
  | "curve-points";
export interface MenuItemBase {
  type: MenuItemType;
  fieldName?: string;
  title: string | React.ReactElement;
  defaultValue?: any;
  minValue?: number;
  maxValue?: number;
  step?: number;
}

export interface SliderItem extends MenuItemBase {
  type: "slider";
  fieldName: string;
  defaultValue: number;
}
export interface GroupItem extends MenuItemBase {
  type: "group";
  items: IMenuItem[];
}
export interface SwitcherItem extends MenuItemBase {
  type: "switcher";
  fieldName: string;
  defaultValue: boolean;
}
export interface OptionalGroupItem extends MenuItemBase {
  type: "optional-group";
  fieldName: string;
  defaultValue: boolean;
  items: IMenuItem[];
}
export interface ActionItem extends MenuItemBase {
  type: "action";
  fieldName: string;
  defaultValue?: number;
}
export interface DoubleActionItem extends MenuItemBase {
  type: "double-action";
  title: string | React.ReactElement;
  actionOneName: string;
  actionOneTitle: string | React.ReactElement;
  actionTwoName: string;
  actionTwoTitle: string | React.ReactElement;
}
export interface DoubleInputActionItem extends MenuItemBase {
  type: "double-input-action";
  fieldName: string;
  defaultValue: number;
  actionOneName: string;
  actionOneTitle: string | React.ReactElement;
  actionTwoName: string;
  actionTwoTitle: string | React.ReactElement;
}
export interface CurveItem extends MenuItemBase {
  type: "curve-points";
  fieldName: string;
}

export type IMenuItem =
  | SliderItem
  | GroupItem
  | SwitcherItem
  | OptionalGroupItem
  | ActionItem
  | DoubleActionItem
  | DoubleInputActionItem
  | CurveItem;

interface MenuItemProps {
  item: IMenuItem;
  disabled?: boolean;
}
const MenuItemMemo: React.FC<MenuItemProps> = ({ item, ...props }) => {
  if (!item) return null;
  if (item.type === "slider") return <Slider item={item} {...props} />;
  if (item.type === "group") return <Group item={item as GroupItem} {...props} />;
  if (item.type === "switcher") return <Switcher item={item as SwitcherItem} {...props} />;
  if (item.type === "optional-group") {
    return <OptionalGroup item={item as OptionalGroupItem} {...props} />;
  }
  if (item.type === "action") return <Action item={item as ActionItem} {...props} />;
  if (item.type === "double-action")
    return <DoubleAction item={item as DoubleActionItem} {...props} />;
  if (item.type === "double-input-action")
    return <DoubleInputAction item={item as DoubleInputActionItem} {...props} />;
  if (item.type === "curve-points") return <CurvePoints item={item as CurveItem} {...props} />;
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
      <li key={item.fieldName}>
        <MenuItem item={item} disabled={disabled} />
      </li>
    ))}
  </ul>
);
