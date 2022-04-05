import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import AccountPopover from './AccountPopover';


// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

interface Props {
  admin?: boolean
  title?: string
  back?: boolean
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop != "admin"
})<Props>(({ theme, admin }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  transition: "0.2s all ease",
  backgroundColor: (admin ? theme.palette.grey[900] : alpha(theme.palette.background.default, 0.72)),
  color: (admin ? theme.palette.common.white : theme.palette.grey[900]),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
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


export default function DashboardNavbar({ admin, title, back }: Props) {
  const router = useRouter()

  return (
    <RootStyle admin={admin} position="relative">
      <ToolbarStyle>
        {back && (
          <IconButton onClick={() => router.back()} edge="start" sx={{ mr: 1 }}>
            <ArrowLeft />
          </IconButton>
        )}
        <Typography variant="subtitle1">{title ? title : "Singsaker intern"}</Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
