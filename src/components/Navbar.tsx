import * as React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import { scenes } from "scenes";
import { Logo } from "components";

const StyledTooltip = styled(Tooltip)`
  z-index: 5;
  @media (min-width: 1020px) {
    display: none !important;
  }
  @media (max-width: 720px) {
    display: none !important;
  }
`;

const Base = styled.div`
  display: block;
  background-color: var(--color-gray-10);
  transition: all 0.2s ease-out;
  position: relative;

  & > .right-side-line {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -5px;
    width: 11px;
    transition: all 0.2s ease-out;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;

    &::before {
      transition: all 0.2s ease-out;
      background-color: var(--color-gray-20);
      border-radius: 50%;
      color: var(--color-gray-80);
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      height: 24px;
      width: 24px;
      content: "<";
      position: absolute;
      top: 32px;
      bottom: 0;
      right: -5px;
      background: transparent;
      z-index: 2;
    }
    &::after {
      transition: all 0.2s ease-out;
      width: 1px;
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 5px;
      background: transparent;
    }
    &:hover,
    &:focus {
      &::before {
        background-color: var(--color-gray-30);
        color: var(--color-gray-90);
        box-shadow: 0 0 0 2px var(--color-primary);
      }
      &::after {
        background-color: var(--color-primary);
      }
    }

    @media (max-width: 1020px) {
      display: none !important;
      &::before,
      &::after {
        display: none !important;
      }
    }
  }
  &:not(:hover) > .right-side-line {
    &::before {
      opacity: 0;
    }
  }

  & > div {
    padding: 24px 9px 48px 8px;
    transition: all 0.2s ease-out;

    height: 100%;
    width: 240px;
    overflow-y: auto;

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
          margin-right: 16px;
        }
      }
    }
  }

  @media (min-width: 1021px) {
    &[data-open="false"] {
      & > div {
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

      & > .right-side-line {
        &::before {
          transform: rotate(180deg);
        }
      }
    }
  }
  @media (max-width: 1020px) {
    & > div {
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
  }

  @media (max-width: 720px) {
    overflow-x: auto;
    padding: 0;
    width: 100vw;

    & > div {
      display: flex;
      align-items: center;

      padding: 8px 24px;

      & header {
        height: fit-content;
        & h1 {
          margin-bottom: 0;
          margin-right: 20px;
        }
      }
      & .menuList {
        grid-auto-flow: column;
      }
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

        overflow: hidden;
        width: 100%;
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

export const NavBar: React.FC<NavBarProps> = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <Base data-custom-scrollbar className="navbar" data-open={open}>
      <div>
        <header>
          <h1>
            <a href="http://snelsi.now.sh/" target="_blank" rel="noreferrer noopener">
              <Logo /> <span className="optional">R.V. Zhuravlov</span>
            </a>
          </h1>
        </header>
        <nav>
          <MenuList className="menuList">
            {Object.entries(scenes).map(([url, { title, icon }]) => (
              <li key={url}>
                <StyledTooltip
                  hasArrow
                  label={title}
                  aria-label={title}
                  placement="right"
                  bg="#303030"
                >
                  <NavLink to={url} title={title}>
                    {icon && <span className="menuItem-icon">{icon}</span>}
                    <div className="menuItem-title">{title}</div>
                  </NavLink>
                </StyledTooltip>
              </li>
            ))}
          </MenuList>
        </nav>
      </div>

      <button className="right-side-line" onClick={() => setOpen(!open)} />
    </Base>
  );
};
