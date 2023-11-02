
import {
  DEFAULT_THEME,
  mergeMantineTheme,
  MantineProvider,
  createTheme,
  rem,
} from "@mantine/core";
import DrawerProvider from "./Contexts/drawerContext";

import { useThemeStore } from "./store/ThemeStore";

import { useHotkeys, useLocalStorage } from "@mantine/hooks";



const themeOverride = createTheme({
  fontFamily: "Verdana, sans-serif",
  white: "#FAFAFA",
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  titleFontSize: rem(32),
  cardHeight: rem(440),
});
const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export default ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });
  
  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  
  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };
  const {darkMode} = useThemeStore((state)=>state)
  return (
    <>
      <MantineProvider theme={{colorScheme:colorScheme}} withGlobalStyles withNormalizeCSS>
        <DrawerProvider>{children}</DrawerProvider>
      </MantineProvider>
    </>
  );
};
