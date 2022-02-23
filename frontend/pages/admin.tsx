import { alpha, AppBar, Box, Dialog, styled, Tab, Tabs, Typography } from '@mui/material';
import MemberCard from '@src/views/members/MemberCard';
import MembersList from '@src/views/members/MembersList';
import React, { useState } from 'react';
import WorkModule from 'src/admin/projects/WorkModule';
import DashboardLayout from "src/layouts/dashboard";

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  color: theme.palette.grey[900],
}));

const Admin = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [beboerModal, setBeboerModal] = useState(false);
  const [beboerId, setBeboerId] = useState<number | null>(null);

  const toggleBeboerModal = (id: number) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };


  return (
    <DashboardLayout>
      <Box mt={6} mb={8}>
        <Box sx={{ width: '100%' }}>
          <RootStyle color="inherit" sx={{ borderBottom: 1, borderColor: 'divider', top: 64 }}>
            <Tabs
              variant="scrollable"
              value={value}
              onChange={handleChange}
            >
              <Tab label="Romsjef" />
              <Tab label="Regisjef" />
              <Tab label="Vaktsjef" />
              <Tab label="Sekretær" />
              <Tab label="Kosesjef" />
              <Tab label="Husfar" />
            </Tabs>
          </RootStyle>
          <TabPanel value={value} index={0}>
            <Typography variant="h3" sx={{ mb: 3 }}>Beboere</Typography>
            <Box pb={8}>
              <MembersList toggleBeboer={(id: number) => toggleBeboerModal(id)} />
            </Box>
            {/* Beboermodal: */}
            <Dialog onClose={toggleBeboerModal} open={beboerModal}>
              <MemberCard toggleBeboerModal={toggleBeboerModal} beboer_id={beboerId} />
            </Dialog>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WorkModule />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h3" sx={{ mb: 3 }}>Vakt</Typography>
          </TabPanel>
          <TabPanel value={value} index={3}>
            Sekretær
          </TabPanel>
          <TabPanel value={value} index={4}>
            Kosesjef
          </TabPanel>
          <TabPanel value={value} index={5}>
            Husfar
          </TabPanel>
        </Box>
      </Box>
    </DashboardLayout>
  )
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Admin;

