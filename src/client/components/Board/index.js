import React from "react";
import Cell from "../Cell";
import { BoardContainer } from "./styles";
import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(25vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;

const Board = ({ stage }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
    // <BoardContainer>
    //   {image.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    //   {/* {image.map(n => (
    //     <Cell n={n} />
    //   ))} */}
    // </BoardContainer>
  );
};

export default Board;
