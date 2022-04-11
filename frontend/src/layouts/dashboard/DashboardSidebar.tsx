import { useAuthentication } from "@api/authentication";
import { alpha, Avatar, Box, Drawer, Link, List, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import Routes from "@src/routes";
import useResponsive from "@utils/useResponsive";
import router from "next/router";
import { House, Key, ShoppingCart, Timer, UserList } from "phosphor-react";
import { useEffect, useState } from "react";
// components
import Logo from 'src/components/Logo';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200]
}));

const ListItemStyle = styled((props: ListItemButtonProps) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const routes = [
  { title: "Hjem", path: "/", icon: <House weight="duotone" /> },
  { title: "Dugnad", path: "/work", icon: <Timer weight="duotone" /> },
  { title: "Beboere", path: "/members", icon: <UserList weight="duotone" /> },
  { title: "Kryssing", path: "/shops", icon: <ShoppingCart weight="duotone" /> },
  { title: "Utvalget", path: "/admin", icon: <Key weight="duotone" /> },
];

// ----------------------------------------------------------------------

interface DashboardSidebarProps {
  isOpenSidebar?: boolean;
  onCloseSidebar: () => void;
}

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { userDetails } = useAuthentication();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    "&:before": { display: "block" },
  };

  const [value, setValue] = useState<string>();

  const handleChange = (newValue: string) => {
    if (newValue == Routes.admin) {
      router.push(newValue + "/rooms", undefined, { shallow: true })
    } else {
      router.push(newValue, undefined, { shallow: true })
    }
    onCloseSidebar()
  };

  useEffect(() => {
    const path = "/" + router.pathname.split("/")[1]

    setValue(path)
  })

  const renderContent = (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box sx={{ display: 'inline-flex' }}>
          <Logo sx={{ width: 200 }} />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" >
          <AccountStyle>
            <Avatar alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userDetails?.username}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                logget inn
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <List component="div" disablePadding>
        {routes.map((item, index) => {
          const { title, path, icon } = item;

          return (
            <ListItemStyle
              key={index}
              onClick={() => handleChange(path)}
              sx={{
                ...(value === path && activeRootStyle),
              }}
            >
              <ListItemIconStyle>{icon}</ListItemIconStyle>
              <ListItemText disableTypography primary={title} />
            </ListItemStyle>
          );
        })}
      </List>
    </Box>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
