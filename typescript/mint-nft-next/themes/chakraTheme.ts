import { extendTheme } from "@chakra-ui/react";

// https://chakra-ui.com/docs/theming/theme
const config = {
  initialColorMode: "dark" as const,
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
export default theme;
