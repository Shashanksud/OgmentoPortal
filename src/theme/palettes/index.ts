/* eslint-disable prettier/prettier */
// material-ui
import { createTheme } from '@mui/material/styles';

// assets
import { DefaultPalette } from './paletteDefault';
import { ThemeOne } from './paletteOne';
import { ThemeTwo } from './paletteTwo';

// Define the extended custom properties
declare module '@mui/material/styles' {
  interface PaletteOptions {
    orange?: {
      light: string;
      main: string;
      dark: string;
    };
    dark?: {
      light: string;
      main: string;
      dark: string;
      800: string;
      900: string;
    };
  }

  interface Palette {
    orange: {
      light: string;
      main: string;
      dark: string;
    };
    dark: {
      light: string;
      main: string;
      dark: string;
      800: string;
      900: string;
    };
  }

  interface TypeText {
    dark?: string;
    hint?: string;
  }
}

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

const Palette = (presetColor: string) => {
  let colors;
  switch (presetColor) {
    case 'theme1':
      colors = ThemeOne;
      break;
    case 'theme2':
      colors = ThemeTwo;
      break;
    case 'default':
    default:
      colors = DefaultPalette;
  }

  return createTheme({
    palette: {
      common: {
        black: colors.darkPaper,
      },
      primary: {
        light: colors.primaryLight,
        main: colors.primaryMain,
        dark: colors.primaryDark,
        200: colors.primary200,
        800: colors.primary800,
      },
      secondary: {
        light: colors.secondaryLight,
        main: colors.secondaryMain,
        dark: colors.secondaryDark,
        200: colors.secondary200,
        800: colors.secondary800,
      },
      error: {
        light: colors.errorLight,
        main: colors.errorMain,
        dark: colors.errorDark,
      },
      orange: {
        light: colors.orangeLight,
        main: colors.orangeMain,
        dark: colors.orangeDark,
      },
      warning: {
        light: colors.warningLight,
        main: colors.warningMain,
        dark: colors.warningDark,
      },
      success: {
        light: colors.successLight,
        200: colors.success200,
        main: colors.successMain,
        dark: colors.successDark,
      },
      grey: {
        50: colors.grey50,
        100: colors.grey100,
        500: colors.grey500,
        600: colors.grey600,
        700: colors.grey700,
        900: colors.grey900,
      },
      dark: {
        light: colors.darkTextPrimary,
        main: colors.darkLevel1,
        dark: colors.darkLevel2,
        800: colors.darkBackground,
        900: colors.darkPaper,
      },
      text: {
        primary: colors.grey700,
        secondary: colors.grey500,
        dark: colors.grey900,
        hint: colors.grey100,
      },
      divider: colors.grey200,
      background: {
        paper: colors.paper,
        default: colors.paper,
      },
    },
  });
};

export default Palette;
