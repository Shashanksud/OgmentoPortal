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
    primaryHover?: string;
    secondaryHover?: string;
  }

  interface Palette {
    primaryHover: string;
    secondaryHover: string;
  }

  interface TypeText {
    primaryTextMain?: string;
    primaryTextLight?: string;
    primaryText200?: string;
    secondaryTextMain?: string;
    secondaryTextLight?: string;
    secondaryText200?: string;
    primaryTextHover?: string;
    secondaryTextHover?: string;
    hint?: string;
    hover?: string;
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
      primary: {
        main: colors.primaryMain,
        light: colors.primaryLight,
        dark: colors.primaryDark,
      },
      secondary: {
        light: colors.secondaryLight,
        main: colors.secondaryMain,
        dark: colors.secondaryDark,
      },
      error: {
        light: colors.errorLight,
        main: colors.errorMain,
        dark: colors.errorDark,
      },
      warning: {
        light: colors.warningLight,
        main: colors.warningMain,
        dark: colors.warningDark,
      },
      success: {
        light: colors.successLight,
        main: colors.successMain,
        dark: colors.successDark,
      },
      text: {
        primary: colors.primaryTextMain,
        secondary: colors.primaryMain,
        disabled: colors.primaryText200,
        hint: colors.primaryTextLight,
        hover: colors.primaryTextHover,
      },
      background: {
        paper: colors.paper,
        default: colors.paperLight,
      },
      divider: colors.primaryBorderMain,
      primaryHover: colors.primaryHover,
      secondaryHover: colors.secondaryHover,
    },
    // breakpoints:{down:} P
  });
};

export default Palette;
