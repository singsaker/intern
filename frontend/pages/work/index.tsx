import { Divider } from '@mui/material';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";

const Work = () => {
  return (
    <DashboardLayout>
      <WorkModule />
      <Divider sx={{ my: 2 }} />
      <ShiftModule />
    </DashboardLayout>
  )
}

export default Work;