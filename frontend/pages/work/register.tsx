import { useAuthentication } from '@api/authentication';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from "@graphql/projects/queries";
import { Container, Typography } from '@mui/material';
import Routes from '@src/routes';
import { useRouter } from 'next/router';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";
import WorkRegisterForm from 'src/views/work/WorkRegisterForm';


const RegisterWorkPage = () => {
  const { userDetails } = useAuthentication()
  const router = useRouter()
  const { project } = router.query

  // Hent prosjekt
  const { data: projectData, loading } = useQuery(GET_PROJECT,
    { variables: { id: project } });

  return (
    <Container>
      <Typography>Regiprosjekt: <b>{!loading && projectData?.project.name}</b></Typography>
      <WorkRegisterForm project={project} onComplete={() => router.push(Routes.work)} />
    </Container>
  )
}

RegisterWorkPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout title="Registrer regi" back>
      {page}
    </DashboardLayout>
  )
}

export default RegisterWorkPage;