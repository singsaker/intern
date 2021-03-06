import DashboardLayout from "@layouts/dashboard";
import { Box, Container, Dialog, Tab, Tabs, Typography } from '@mui/material';
import MemberCard from '@src/views/members/MemberCard';
import MembersList from '@src/views/members/MembersList';
import { ReactElement, useState } from 'react';

const AdminRoomsPage = () => {

  const [beboerModal, setBeboerModal] = useState(false);
  const [beboerId, setBeboerId] = useState<number | null>(null);

  const toggleBeboerModal = (id: number) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };

  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, mt: -1 }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Beboere" />
          <Tab label="Ansiennitet" />
          <Tab label="Storhybelliste" />
          <Tab label="Søknader" />
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={tab !== 0}
      >
        {tab === 0 && (
          <MembersList toggleBeboer={(id: number) => toggleBeboerModal(id)} />
        )}
      </div>
      <div
        role="tabpanel"
        hidden={tab !== 1}
      >
        {tab === 1 && (
          <Box sx={{ pt: 3 }}>
            <Typography>Ansiennitet</Typography>
          </Box>
        )}
      </div>
      <div
        role="tabpanel"
        hidden={tab !== 2}
      >
        {tab === 2 && (
          <Box sx={{ pt: 3 }}>
            <Typography>Søknader</Typography>
          </Box>
        )}
      </div>
      {/* Beboermodal: */}
      <Dialog onClose={toggleBeboerModal} open={beboerModal}>
        <MemberCard toggleBeboerModal={toggleBeboerModal} beboer_id={beboerId} />
      </Dialog>
    </Container>
  )
}


AdminRoomsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout admin title="Utvalget intern">
      {page}
    </DashboardLayout>
  )
}

export default AdminRoomsPage;