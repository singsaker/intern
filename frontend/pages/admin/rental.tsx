import DashboardLayout from "@layouts/dashboard";
import { Container, Typography } from '@mui/material';
import { ReactElement } from 'react';

const AdminRentalPage = () => {

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>Kosesjef</Typography>
    </Container>
  )
}


AdminRentalPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout admin title="Utvalget intern">
      {page}
    </DashboardLayout>
  )
}

export default AdminRentalPage;