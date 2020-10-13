import * as React from "react";
import styled from "styled-components";

import { GroupItem, MenuItems } from "components";

const Wrapper = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;

  & .group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5em;
    & > .group-title {
      color: var(--color-gray-70);
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

interface GroupProps {
  item: GroupItem;
  disabled?: boolean;
}

export const Group: React.FC<GroupProps> = ({ item: { title, items }, disabled = false }) => {
  return (
    <Wrapper>
      <div className="group-header">
        <div className="group-title">{title}</div>
      </div>
      <div>
        <MenuItems items={items} disabled={disabled} />
      </div>
    </Wrapper>
  );
};
