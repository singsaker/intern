import { useAuthentication } from "@api/authentication";
// components
import Logo from 'src/components/Logo';
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';

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
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

interface DashboardSidebarProps {
  isOpenSidebar?: boolean;
  onCloseSidebar?: () => void;
}

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { useData } = useAuthentication();
  const { username } = useData();

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
        <Link underline="none"  >
          <AccountStyle>
            <Avatar alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {username}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                logget inn
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
    </Box>
  );

  return (
    <RootStyle>
      <Drawer
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: 'background.default'
          }
        }}
      >
        {renderContent}
      </Drawer>
    </RootStyle>
  );
}
