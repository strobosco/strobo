import { extendTheme } from "@chakra-ui/react";
import { sizes } from "./tokens/sizes";
import { breakpoints } from "./tokens/breakpoints";
import { colors } from "./tokens/colors";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  colors,
  fonts,
  sizes,
  breakpoints,
});

export default theme;
