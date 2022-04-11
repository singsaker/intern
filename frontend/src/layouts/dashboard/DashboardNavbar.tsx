import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { List } from 'phosphor-react';
import AccountPopover from './AccountPopover';


// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

interface Props {
  admin?: boolean
  title?: string
  back?: boolean
  onOpenSidebar?: () => void
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop != "admin"
})<Props>(({ theme, admin }) => ({
  boxShadow: 'none',
  // backdropFilter: 'blur(6px)',
  // WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  transition: "0.2s all ease",
  backgroundColor: (admin ?
    theme.palette.grey[900] : (
      theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.common.white
    )
  ),
  color: (admin ?
    theme.palette.common.white : (
      theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.grey[900]
    )
  ),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    marginLeft: DRAWER_WIDTH
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------


export default function DashboardNavbar({ admin, title, back, onOpenSidebar }: Props) {
  const router = useRouter()

  return (
    <RootStyle admin={admin} position="relative">
      <ToolbarStyle>
        <IconButton
          edge="start"
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: admin ? "common.white" : 'text.primary', display: { lg: 'none' } }}
        >
          <List />
        </IconButton>
        {/* {back && (
          <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
            <ArrowLeft />
          </IconButton>
        )} */}
        <Typography variant="subtitle1">{title ? title : "Singsaker intern"}</Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
