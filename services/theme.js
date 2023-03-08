export const finFlexColors = {
  bg: {
    100: "#ffffff",
    200: "#e8e5f8",
  },
  dark: {
    100: "#161c2c", //bg
    200: "#252a41", //fgonpress props
    300: "#3f69ff", //blue btn
    400: "#2d3751",
  },
};
export const globalTheme = {
  dark: {
    primary: finFlexColors.dark[100],
    secondary: finFlexColors.dark[200],
  },
  light: {
    primary: finFlexColors.bg[100],
    secondary: finFlexColors.bg[200],
  },
};
export const navThemeDark = {
  dark: true,
  colors: {
    primary: finFlexColors.dark[100],
    background: finFlexColors.dark[100],
    card: finFlexColors.dark[100],
    text: "white",
    //border: "pink",
    border: "#242326",
    notification: "pink",
  },
};
export const navThemeLight = {
  dark: true,
  colors: {
    primary: finFlexColors.bg[100],
    background: finFlexColors.bg[100],
    card: finFlexColors.bg[100],
    text: "black",
    border: "#e4e4e7",
    notification: "pink",
  },
};

export const nativeBaseTheme = {
  colors: finFlexColors,
  config: {
    initialColorMode: "dark",
  },
  fontConfig: {
    Rubik: {
      400: {
        normal: "Rubik_400Regular",
      },
      600: {
        normal: "Rubik_500Medium",
      },
      700: {
        normal: "Rubik_600SemiBold",
      },
    },
  },
  fonts: {
    heading: "Rubik",
    body: "Rubik",
    mono: "Rubik",
  },
};
