// ----------------------------------------------------------------------

import { Theme } from '@mui/material/styles';

export default function Container(theme: Theme) {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {
          [theme.breakpoints.up('lg')]: {
            paddingRight: 40,
            paddingLeft: 40,
            maxWidth: '100%',
          },
        },
      },
    },
  };
}
