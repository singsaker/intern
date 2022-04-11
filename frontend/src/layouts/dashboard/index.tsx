// material
import { useAuthentication } from '@api/authentication';
import Loading from '@components/Loading';
import AdminLayout from '@layouts/admin';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 48;
const APP_BAR_DESKTOP = 92;


const MainStyle = styled('div')(({ theme }) => ({
  // paddingTop: APP_BAR_MOBILE + 24,
  // paddingLeft: theme.spacing(2),
  // paddingRight: theme.spacing(2),
  width: "100%",
  paddingTop: theme.spacing(2),

  [theme.breakpoints.up('lg')]: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  }
}));

// ----------------------------------------------------------------------

interface Props {
  children: JSX.Element | JSX.Element[]
  admin?: boolean
  title?: string
  back?: boolean
}

export default function DashboardLayout({ children, admin, title, back }: Props) {
  const [open, setOpen] = useState(false);
  const { userDetails } = useAuthentication();

  if (!userDetails) {
    return <Loading />
  }

  return (
    <Box sx={{ minHeight: "100vh", pb: 8, bgcolor: (theme) => theme.palette.mode == "dark" ? "grey.900" : "grey.100" }}>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} admin={admin} title={title} back={back} />
      {admin && (<AdminLayout />)}
      <Box display="flex">
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle>
          {children}
        </MainStyle>
      </Box>
    </Box>
  );
}
