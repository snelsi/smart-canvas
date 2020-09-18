import * as React from "react";
import styled from "styled-components";
import {
  Drawer,
  DrawerOverlay,
  Button,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
} from "@chakra-ui/core";

import { Slider } from "components";

const SidebarMobile = styled.div`
  @media (min-width: 801px) {
    display: none;
  }

  & > button {
    color: var(--color-gray-80);
    padding: 4px;
    position: fixed;
    right: 16px;
    z-index: 2;

    height: 48px;
    width: 48px;

    background-color: var(--color-gray-10);

    @media (min-width: 721px) {
      top: 32px;
    }
    @media (max-width: 720px) {
      bottom: 32px;
    }

    &:hover {
      background-color: var(--color-gray-50);
    }
    &:active {
      background-color: var(--color-gray-40);
    }
  }
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.015em;

  & a {
    text-decoration: none;
    &:hover {
      color: var(--color-gray-80);
      text-decoration: underline;
    }
  }
`;

interface TitleProps {
  titleLink?: string;
}
const SidebarTitle: React.FC<TitleProps> = React.memo(({ children, titleLink }) => {
  if (titleLink) {
    return (
      <Title>
        <a href={titleLink} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Title>
    );
  }

  return <Title>{children}</Title>;
});

const SidebarHeader = styled.div`
  color: var(--color-gray-70);

  & .image-component,
  & p,
  & ul {
    margin-bottom: 20px;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  & img {
    background-color: var(--color-gray-90);
  }
  & ul {
    padding-left: 20px;
    line-height: 1.5;
    & li {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }
`;

const Bar = styled.aside`
  display: block;
  background-color: var(--color-gray-20);
  padding: 32px 24px 64px;
  height: 100%;
  width: clamp(250px, 33vw, 400px);
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 800px) {
    display: none;
  }
`;

export type MenuItemType = "slider";
export interface MenuItem {
  type: MenuItemType;
  fieldName: string;
  title: string;
  defaultValue?: any;
  minValue?: number;
  maxValue?: number;
  step?: number;
}
export interface SidebarProps {
  title: string;
  titleLink?: string;
  sideBarHeader?: React.ReactElement;
  menuItems: MenuItem[];
}

const SidebarBase: React.FC<SidebarProps> = React.memo(
  ({ title, titleLink, sideBarHeader, menuItems = [] }) => (
    <Bar data-custom-scrollbar>
      <div>
        <SidebarHeader className="sideBar-header">
          <SidebarTitle titleLink={titleLink}>{title}</SidebarTitle>
          {sideBarHeader}
        </SidebarHeader>
        <ul>
          {menuItems?.map((item) => (
            <MenuItem key={item.fieldName} {...item} />
          ))}
        </ul>
      </div>
    </Bar>
  ),
);

export const Sidebar: React.FC<SidebarProps> = ({
  title,
  titleLink,
  sideBarHeader,
  menuItems = [],
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const btnRef = React.useRef();

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <SidebarMobile>
        <Button ref={btnRef} variantColor="teal" onClick={onOpen}>
          <svg fill="currentColor" viewBox="0 0 24 24" height="24" width="24">
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
          </svg>
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent
            p={0}
            bg="var(--color-gray-20)"
            color="var(--color-gray-70)"
            overflowY="auto"
            data-custom-scrollbar
          >
            <DrawerCloseButton color="var(--color-gray-70)" />
            <DrawerHeader>
              <SidebarTitle titleLink={titleLink}>{title}</SidebarTitle>
            </DrawerHeader>

            <DrawerBody paddingBottom="64px">
              <div>
                <SidebarHeader className="sideBar-header">{sideBarHeader}</SidebarHeader>
                <ul>
                  {menuItems?.map((item) => (
                    <MenuItem key={item.fieldName} {...item} />
                  ))}
                </ul>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </SidebarMobile>

      <SidebarBase
        title={title}
        titleLink={titleLink}
        sideBarHeader={sideBarHeader}
        menuItems={menuItems}
      />
    </>
  );
};

const MenuItemMemo: React.FC<MenuItem> = ({ type, ...props }) => {
  if (type === "slider") return <Slider {...props} />;
  return null;
};
export const MenuItem = React.memo(MenuItemMemo);
