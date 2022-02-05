// material
import { styled } from '@mui/material/styles';
import useResponsive from '@utils/useResponsive';
import { useState } from 'react';
import DashboardAppbar from './DashboardAppbar';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 58;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  paddingTop: APP_BAR_MOBILE + 16,
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
}

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive("up", "lg")

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      {isDesktop ? <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> : <DashboardAppbar />}
      <MainStyle>
        {children}
      </MainStyle>
    </RootStyle>
  );
}
