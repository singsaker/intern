import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import shape from './shape';
import typography from './typography';

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const themeMode = "light"

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette[themeMode],
      shape,
      mode: themeMode,
      typography,
      shadows: shadows[themeMode],
      customShadows: customShadows[themeMode],
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
