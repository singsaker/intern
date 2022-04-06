import { Box, Container, Divider } from '@mui/material';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";

const WorkPage = () => {
  return (
    <>
      <Box sx={{ py: 3, bgcolor: "grey.200" }} >
        <Container>
          <WorkModule />
        </Container>
      </Box>
      <Divider />
      <Box sx={{ py: 3, bgcolor: "grey.200" }} >
        <Container>
          <ShiftModule />
        </Container>
      </Box>
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