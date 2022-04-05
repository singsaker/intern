import DashboardLayout from "@layouts/dashboard";
import { Box, Dialog, Typography } from '@mui/material';
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

  return (
    <>
      <Typography variant="h3" sx={{ mb: 3 }}>Beboere</Typography>
      <Box pb={8}>
        <MembersList toggleBeboer={(id: number) => toggleBeboerModal(id)} />
      </Box>
      {/* Beboermodal: */}
      <Dialog onClose={toggleBeboerModal} open={beboerModal}>
        <MemberCard toggleBeboerModal={toggleBeboerModal} beboer_id={beboerId} />
      </Dialog>
    </>
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