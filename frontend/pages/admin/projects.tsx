import AdminLayout from "@layouts/admin";
import DashboardLayout from "@layouts/dashboard";
import WorkModule from "@src/admin/projects/WorkModule";
import { ReactElement } from "react";


const AdminProjectsPage = () => {
  return (
    <WorkModule />
  )
}

AdminProjectsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout admin title="Utvalget intern">
      <AdminLayout>{page}</AdminLayout>
    </DashboardLayout>
  )
}

export default AdminProjectsPage;