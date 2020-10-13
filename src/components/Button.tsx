import * as React from "react";
import styled from "styled-components";

import { Button as ChakraButton, ButtonProps } from "@chakra-ui/core";

const StyledButton = styled(ChakraButton)`
  &[data-force-restyle] {
    border-radius: 4px;
    background-color: var(--color-gray-30);
    color: var(--color-gray-80);
    cursor: pointer;
    font-weight: 400;
    padding: 0.75em 1.5em;
    width: 100%;

    &:hover,
    &:focus {
      background-color: var(--color-gray-10);
    }

    :focus:not(:focus-visible) {
      outline: 0;
      box-shadow: none !important;
    }

    &:active {
      background-color: var(--color-gray-40);
    }
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      height: 24px;
      width: 24px;
    }
  }
  &[data-icon="true"] {
    padding: 0;
    min-width: 48px;
    min-height: 40px;
  }
  &[data-full-width="true"] {
    width: 100%;
  }
`;

const Button = ({ children, ...props }: ButtonProps) => (
  <StyledButton data-force-restyle={true} {...props}>
    {children}
  </StyledButton>
);
export default Button;
