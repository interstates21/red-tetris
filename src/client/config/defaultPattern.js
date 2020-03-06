export const PATTERN_WIDTH = 12;
export const PATTERN_HEIGHT = 20;

export const defaultPattern = () =>
  Array.from(Array(PATTERN_HEIGHT), () =>
    Array(PATTERN_WIDTH).fill([0, "clear"])
  );
