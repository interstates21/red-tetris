import React, { useCallback } from "react";
import styled from "styled-components";
// import { StyledCell } from "./styles";
import ITEMS from "../../../config/Items";

const StyledCell = styled.div`
  width: auto;
  /* border-radius: 5px; */
  background: rgba(${props => props.color}, 0.8);
  border: ${props => (props.type === 0 ? "0px solid" : "4px solid")};
  border-bottom-color: rgba(${props => props.color}, 0.1);
  border-right-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);
`;

const Cell = ({ type }) => {
  // const getColor = useCallback(() => {
  //   return n === 0 ? "red" : "black";
  // }, [n]);

  return <StyledCell type={type} color={ITEMS[type].color}></StyledCell>;
  //<StyledCell opacity={n ? 0.7 : 0.2} color={getColor()} />;
};

export default React.memo(Cell);
