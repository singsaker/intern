import { Box } from '@mui/material';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";

const WorkPage = () => {
  return (
    <>
      <WorkModule />
      <Box sx={{ my: 3 }} />
      <ShiftModule />
    </>
  )
}

WorkPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout title="Dugnad">
      {page}
    </DashboardLayout>
  )
}

export default WorkPage;