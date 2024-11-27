import { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, Direction } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Palette from './palettes';
import componentStyleOverrides from './componentStyleOverride';
import Typography from './typography';
import customShadows from './shadows';

interface ThemeCustomizationProps {
  children: ReactNode;
}

export default function ThemeCustomization({
  children,
}: ThemeCustomizationProps) {
  const { borderRadius, presetColor, fontFamily } = {
    borderRadius: 8,
    presetColor: 'default', // default, theme1, theme2
    fontFamily: 'Roboto',
  };

  const theme = useMemo(() => Palette(presetColor), [presetColor]);
  const themeTypography = useMemo(
    () => Typography(theme, borderRadius, fontFamily),
    [theme, borderRadius, fontFamily]
  );
  const themeCustomShadows = useMemo(() => customShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      direction: 'ltr' as Direction,
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = useMemo(() => createTheme(themeOptions), [themeOptions]);

  themes.components = useMemo(
    () => componentStyleOverrides(themes, borderRadius),
    [themes, borderRadius]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
