import DashboardLayout from "@layouts/dashboard";
import { Box, Dialog, Typography } from "@mui/material";
import MemberCard from "@src/views/members/MemberCard";
import MembersList from "@src/views/members/MembersList";
import { useState } from "react";

const Members = () => {
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
      <Typography variant="h2" sx={{ mb: 3 }}>Beboere</Typography>
      <Box pb={8}>
        <MembersList toggleBeboer={(id: number) => toggleBeboerModal(id)} />
      </Box>
      {/* Beboermodal: */}
      <Dialog onClose={toggleBeboerModal} open={beboerModal}>
        <MemberCard toggleBeboerModal={toggleBeboerModal} beboer_id={beboerId} />
      </Dialog>
    </DashboardLayout>
  )
}

export default Members;