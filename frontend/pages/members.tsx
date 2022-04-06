import DashboardLayout from "@layouts/dashboard";
import { Box, Container, Dialog } from "@mui/material";
import MemberCard from "@src/views/members/MemberCard";
import MembersList from "@src/views/members/MembersList";
import { useState } from "react";

const MembersPage = () => {
  const [beboerModal, setBeboerModal] = useState(false);
  const [beboerId, setBeboerId] = useState<number | null>(null);

  const toggleBeboerModal = (id: number) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };


  return (
    <Container>
      <Box pb={8}>
        <MembersList toggleBeboer={(id: number) => toggleBeboerModal(id)} />
      </Box>
      {/* Beboermodal: */}
      <Dialog onClose={toggleBeboerModal} open={beboerModal}>
        <MemberCard toggleBeboerModal={toggleBeboerModal} beboer_id={beboerId} />
      </Dialog>
    </Container>
  )
}

MembersPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout title="Beboere">
      {page}
    </DashboardLayout>
  )
}

export default MembersPage;