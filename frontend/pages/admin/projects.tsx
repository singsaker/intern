import DashboardLayout from "@layouts/dashboard";
import { Container } from "@mui/material";
import WorkModule from "@src/admin/projects/WorkModule";
import { ReactElement } from "react";


const AdminProjectsPage = () => {
  return (
    <Container>
      <WorkModule />
    </Container>
  )
}

AdminProjectsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout admin title="Utvalget intern">
      {page}
    </DashboardLayout>
  )
}

export default AdminProjectsPage;