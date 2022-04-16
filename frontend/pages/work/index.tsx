import { Container, Divider, Grid, Stack } from '@mui/material';
import CurrentShiftModule from '@src/views/work/CurrentShiftModule';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";

const WorkPage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} item >
          <Stack spacing={2}>
            <CurrentShiftModule />
            <ShiftModule />
          </Stack>
        </Grid>
        <Divider />
        <Grid xs={12} md={6} item>
          <WorkModule />
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