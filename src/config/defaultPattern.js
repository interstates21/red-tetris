const PATTERN_WIDTH = 12;
const PATTERN_HEIGHT = 20;

const getDefaultPattern = () =>
  Array.from(Array(PATTERN_HEIGHT), () =>
    Array(PATTERN_WIDTH).fill([0, "clear"])
  );

module.exports = getDefaultPattern;
