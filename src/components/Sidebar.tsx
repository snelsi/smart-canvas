import * as React from "react";
import styled from "styled-components";

import { Slider } from "components";

const Bar = styled.aside`
  display: block;
  background-color: var(--color-gray-20);
  padding: 32px 24px 64px;
  height: 100%;
  width: clamp(250px, 33vw, 400px);
  overflow-x: hidden;
  overflow-y: auto;

  & > div {
    & > .sideBar-header {
      color: var(--color-gray-70);
      & h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: -0.015em;
        margin-bottom: 20px;

        & a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      & .image-component {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      & img {
        background-color: var(--color-gray-90);
      }
      & ul {
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 20px;
        line-height: 1.5;
        & li {
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }
      }
    }
  }
`;

export type MenuItemType = "slider";
export interface MenuItem {
  type: MenuItemType;
  fieldName: string;
  title: string;
}
export interface SidebarProps {
  sideBarHeader?: React.ReactElement;
  menuItems: MenuItem[];
}

const SidebarMemo: React.FC<SidebarProps> = ({ sideBarHeader, menuItems = [] }) => (
  <Bar data-custom-scrollbar>
    <div>
      <div className="sideBar-header">{sideBarHeader}</div>
      <ul>
        {menuItems?.map((item) => (
          <MenuItem key={item.fieldName} {...item} />
        ))}
      </ul>
    </div>
  </Bar>
);
export const Sidebar = React.memo(SidebarMemo);

const MenuItemMemo: React.FC<MenuItem> = ({ type, ...props }) => {
  if (type === "slider") return <Slider {...props} />;
  return null;
};
export const MenuItem = React.memo(MenuItemMemo);
