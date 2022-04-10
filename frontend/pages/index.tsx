import { useAuthentication } from '@api/authentication';
import { useQuery } from "@apollo/client";
import Loading from '@components/Loading';
import { GET_MEMBERS } from "@graphql/members/queries";
import { Card, CardHeader, Chip, Container, Grid, Stack, styled, Typography } from '@mui/material';
import HomeCalendar from '@src/views/home/HomeCalendar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DashboardLayout from "src/layouts/dashboard";

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 5),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const HomePage = () => {
  const { data, loading } = useQuery(GET_MEMBERS)
  const { userDetails, error } = useAuthentication();
  const router = useRouter();
  const [value, setValue] = useState<Date>(new Date());


  if (error) {
    router.push("/login")
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <CardStyle>
            <Typography variant="h4" sx={{ mb: 2 }}>Melding</Typography>
            <Typography variant="body2">Du har mottatt en faktura fra Singsaker Studenterhjem. Spørsmål vedrørende fakturaen rettes til Singsaker Studenterhjem. Fakturaen kan hentes fram med nettleseren din via denne lenken:</Typography>
          </CardStyle>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="Kalender" />
            <Stack direction="row" mx={3}>
              <Chip size="small" label="Bursdager" sx={{ bgcolor: "secondary.light", color: "common.black" }} />
            </Stack>
            <HomeCalendar members={data.allMembers} />
          </Card>
        </Grid>
      </Grid>
    </Container >
  )
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default HomePage;