import { useAuthentication } from '@api/authentication';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from "@graphql/projects/queries";
import { Button, Typography } from '@mui/material';
import Routes from '@src/routes';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";
import WorkRegisterForm from 'src/views/work/WorkRegisterForm';


export default function RegisterWork() {
  const { userDetails } = useAuthentication()
  const router = useRouter()
  const { project } = router.query

  // Hent prosjekt
  const { data: projectData, loading } = useQuery(GET_PROJECT,
    { variables: { id: project } });

  return (
    <DashboardLayout>
      <Button startIcon={<ArrowLeft />} onClick={() => router.back()} color="inherit" variant="outlined">Returner</Button>
      <Typography variant="h3" sx={{ my: 2 }}>Registrer regi</Typography>
      <Typography>Regiprosjekt: <b>{!loading && projectData?.project.name}</b></Typography>
      <WorkRegisterForm project={project} onComplete={() => router.push(Routes.work)} />

    </DashboardLayout>
  )
}