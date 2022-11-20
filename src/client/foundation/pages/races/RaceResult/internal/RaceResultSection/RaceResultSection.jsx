import React from "react";
import styled from "styled-components";

import { Color, FontSize, Space } from "../../../../../styles/variables";

import { faHandPeace } from '@fortawesome/free-regular-svg-icons/faHandPeace'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Wrapper = styled.div`
  align-items: center;
  color: ${Color.mono[400]};
  display: flex;
  font-size: ${FontSize.LARGE};
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: center;
  padding: ${Space * 2}px;
`;

/**
 * @typedef Props
 */

/** @type {React.VFC<Props>} */
export const RaceResultSection = () => {
  return (
    <Wrapper>
        <FontAwesomeIcon icon={faHandPeace} />
      <i className="far fa-hand-peace" />
      <div>結果はまだありません</div>
    </Wrapper>
  );
};
