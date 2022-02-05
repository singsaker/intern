// ----------------------------------------------------------------------

import { Theme } from '@mui/material/styles';

export default function BottomNavigation(theme: Theme) {
  return {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: '16px 0 0 0',
          minWidth: 0,

          '&.Mui-selected': {
            minWidth: 0,
            '.Mui-selected.MuiBottomNavigationAction-label': {
              ...theme.typography.caption,
            },
            svg: {
              width: 24,
              height: 24,
            },
          },
          svg: {
            width: 24,
            height: 24,
          },
        },

        label: {
          ...theme.typography.caption,
        },
      },
    },
  };
}
