import DashboardLayout from "@layouts/dashboard";
import { Container, Typography } from '@mui/material';
import { ReactElement } from 'react';

const AdminSecretaryPage = () => {

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>Sekretær</Typography>
    </Container>
  )
}


AdminSecretaryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout admin title="Utvalget intern">
      {page}
    </DashboardLayout>
  )
}

export default AdminSecretaryPage;