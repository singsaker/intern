import { Box, Typography } from '@mui/material';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";

const Work = () => {
  return (
    <DashboardLayout>
      <Typography variant="h2" sx={{ mb: 3 }}>Arbeid</Typography>
      <WorkModule />
      <Box sx={{ my: 3 }} />
      <ShiftModule />
    </DashboardLayout>
  )
}

export default Work;