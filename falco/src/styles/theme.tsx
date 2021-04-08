import { extendTheme } from "@chakra-ui/react";
import { sizes } from "./tokens/sizes";
import { breakpoints } from "./tokens/breakpoints";

const fonts = { mono: `'Menlo', monospace` };

// const sizes = {
//   max: "max-content",
//   min: "min-content",
//   full: "100%",
// };

// const breakpoints = createBreakpoints({
//   sm: "40em",
//   md: "52em",
//   lg: "64em",
//   xl: "80em",
// });

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  fonts,
  sizes,
  breakpoints,
});

export default theme;
