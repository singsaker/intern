import { Container, Divider, Grid } from '@mui/material';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";

const WorkPage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={12} lg={6} item >
          <WorkModule />
        </Grid>
        <Divider />
        <Grid xs={12} lg={6} item>
          <ShiftModule />
        </Grid>
      </Grid>
    </Container>
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