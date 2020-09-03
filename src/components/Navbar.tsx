import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@chakra-ui/core";
import { scenes } from "scenes";
import { Logo } from "components";

const StyledTooltip = styled(Tooltip)`
  z-index: 5;
  @media (min-width: 1020px) {
    display: none !important;
  }
`;

const Base = styled.div`
  display: block;
  background-color: var(--color-gray-10);
  padding: 24px 8px 48px;
  height: 100%;
  width: 240px;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s ease-out;

  & > header {
    & > h1 {
      display: block;
      color: var(--color-gray-70);
      font-size: 25px;
      font-weight: 600;
      line-height: 1.25em;
      margin-left: 10px;
      margin-bottom: 20px;

      transition: all 0.2s ease-out;

      &:hover,
      &:focus-within {
        color: var(--color-gray-80);
      }
      &:active {
        color: var(--color-gray-70);
      }

      & > a {
        display: flex;
        align-items: center;
        color: inherit;
        text-decoration: none;
      }

      & svg {
        display: inline-block;
        height: 20px;
        width: 20px;
        margin-right: 20px;
      }
    }
  }

  @media (max-width: 1020px) {
    width: fit-content;
    & .optional {
      display: none;
    }
    & > header > h1 {
      margin-left: 0;
      & a {
        justify-content: center;
      }
      & svg {
        margin-right: 0;
      }
    }
    & .menuList > li {
      width: fit-content;
    }
    & span.menuItem-icon {
      margin-right: 0 !important;
    }
    & .menuItem-title {
      display: none;
    }
  }
`;
const MenuList = styled.ul`
  display: grid;
  gap: 4px;
  width: 100%;
  overflow: hidden;

  & > li {
    width: auto;
    overflow: hidden;
    & > a {
      align-items: center;
      background-color: transparent;
      border-radius: 8px;
      color: var(--color-gray-70);
      font-size: 15px;
      padding: 16px;
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;

      & > div {
        display: inline-block;
        text-overflow: ellipsis;
      }

      & > span.menuItem-icon {
        display: inline-block;
        margin-right: 12px;
        height: 20px;
        width: 20px;
        & svg {
          height: 20px;
          width: 20px;
          margin: 0;
        }
      }

      &:hover,
      &:focus {
        background-color: var(--color-gray-30);
      }
      &:active {
        background-color: var(--color-gray-20);
      }
      &.active {
        background-color: var(--color-primary);
        color: var(--color-gray-80);
      }
    }
  }
`;

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => (
  <Base data-custom-scrollbar>
    <header>
      <h1>
        <a href="http://snelsi.now.sh/" target="_blank" rel="noreferrer noopener">
          <Logo /> <span className="optional">R. Zhuravlov</span>
          {/* R.V. Zhuravlov */}
        </a>
      </h1>
    </header>
    <nav>
      <MenuList className="menuList">
        {Object.entries(scenes).map(([url, { title, icon }]) => (
          <li key={url}>
            <StyledTooltip hasArrow label={title} aria-label={title} placement="right" bg="#303030">
              <NavLink to={url} title={title}>
                {icon && <span className="menuItem-icon">{icon}</span>}
                <div className="menuItem-title">{title}</div>
              </NavLink>
            </StyledTooltip>
          </li>
        ))}
      </MenuList>
    </nav>
  </Base>
);
