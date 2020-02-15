import React, { useCallback } from "react";
import { StyledCell } from "./styles";

const Cell = ({ n }) => {
  const getColor = useCallback(() => {
    return n ? "red" : "black";
  }, [n]);

  return <StyledCell opacity={n ? 0.7 : 0.2} color={getColor()} />;
};

export default Cell;
