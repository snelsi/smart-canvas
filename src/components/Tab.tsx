import * as React from "react";
import styled from "@emotion/styled";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { TabItem, MenuItems } from "components";

const Group = styled.div`
  color: var(--color-gray-70);
  margin-top: 2em;
  margin-bottom: 1.5em;
  & .chakra-accordion__item {
    border-top: none;
    border-bottom: 2px solid var(--color-gray-30);
  }
  & .chakra-accordion__button,
  & .chakra-accordion__panel {
    padding-left: 0;
    padding-right: 0;
  }
  & li {
    display: block;
  }
`;

interface TabProps {
  item: TabItem;
  disabled?: boolean;
}
export const Tab: React.FC<TabProps> = ({ item: { title, items }, disabled = false }) => (
  <Group>
    <Accordion allowToggle>
      <AccordionItem isDisabled={disabled}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pt={4} pb={2}>
          <MenuItems items={items} disabled={disabled} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Group>
);
