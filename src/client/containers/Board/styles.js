import styled from "styled-components";
import { CELL_SIZE, CELL_MARGIN } from "../../constants";


export const BoardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: ${CELL_SIZE * 10 + CELL_MARGIN * 20}px;
  height: ${CELL_SIZE * 20 + CELL_MARGIN * 40}px;
  padding: 20px;
  border-radius: 5px;
  background: #41295a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2f0743,
    #41295a
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2f0743,
    #41295a
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  overflow: hidden;
`;

// @media only screen and (max-width: 500px) {
//     width:${(SMALL_CELL_SIZE * 10) + (CELL_MARGIN * 20)}px;
//     height:${(SMALL_CELL_SIZE * 20) + (CELL_MARGIN * 40)}px;
// }
