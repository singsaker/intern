import { useAuthentication } from '@api/authentication';
import { Divider } from '@mui/material';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";


export default function Work() {
  const { userDetails } = useAuthentication()

  return (
    <main>
      <DashboardLayout>
        <WorkModule />
        <Divider sx={{ my: 2 }} />
        <ShiftModule />
      </DashboardLayout>
    </main>
  )
}