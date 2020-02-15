import styled from "styled-components";
import { CELL_SIZE, CELL_MARGIN } from "../../constants";

export const StyledCell = styled.div`
  display: flex;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  margin: ${CELL_MARGIN}px;
  background-color: ${({ color }) => color};
  border-shadow: 0px 2px 5px white;
  border-radius: 3px;
  opacity: ${props => props.opacity};
`;

// @media only screen and (max-width: 500px) {
//     width:${SMALL_CELL_SIZE}px;
//     height:${SMALL_CELL_SIZE}px;
//     margin: ${CELL_MARGIN}px;
// }
