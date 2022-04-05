// material
import { useAuthentication } from '@api/authentication';
import Loading from '@components/Loading';
import AdminLayout from '@layouts/admin';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResponsive from '@utils/useResponsive';
import { useState } from 'react';
import DashboardAppbar from './DashboardAppbar';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 48;
const APP_BAR_DESKTOP = 92;


const MainStyle = styled('div')(({ theme }) => ({
  // paddingTop: APP_BAR_MOBILE + 24,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingBottom: theme.spacing(10),
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
  const isDesktop = useResponsive("up", "lg")
  const { userDetails } = useAuthentication();

  if (!userDetails) {
    return <Loading />
  }

  return (
    <Box sx={{ minHeight: 1, pb: 10 }}>
      <DashboardNavbar admin={admin} title={title} back={back} />
      {admin && (<AdminLayout />)}
      {admin && (<Box py={1.5} />)}

      {isDesktop ? <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> : <DashboardAppbar />}
      <MainStyle>

        {children}
      </MainStyle>
    </Box>
  );
}
