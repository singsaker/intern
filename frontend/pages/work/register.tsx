import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import { GET_PROJECT } from "@graphql/projects/queries";
import { Box, Card, CardHeader, Container } from '@mui/material';
import Routes from '@src/routes';
import { useRouter } from 'next/router';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";
import WorkRegisterForm from 'src/views/work/WorkRegisterForm';


const RegisterWorkPage = () => {
  const router = useRouter()
  const { project } = router.query

  // Hent prosjekt
  const { data: projectData, loading } = useQuery(GET_PROJECT,
    { variables: { id: project } });

  if (loading) {
    return <Loading />
  }

  return (
    <Container>
      <Card>
        <CardHeader title={"Registrer regi for " + projectData?.project.name} />
        <Box mx={3}>
          <WorkRegisterForm project={project} onComplete={() => router.push(Routes.work)} />
        </Box>
      </Card>
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