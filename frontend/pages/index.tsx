import { useAuthentication } from '@api/authentication';
import { useQuery } from "@apollo/client";
import Loading from '@components/Loading';
import { GET_MEMBERS } from "@graphql/members/queries";
import { Divider, Paper, Typography } from '@mui/material';
import HomeCalendar from '@src/views/home/HomeCalendar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DashboardLayout from "src/layouts/dashboard";

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
    <>
      <Typography variant="h2" component="h1" gutterBottom>Hei, {userDetails?.member.firstName || "Ukjent"}</Typography>
      <Typography variant="h4">Kunngjøringer</Typography>
      <Paper sx={{ my: 2 }}>
        <Typography variant="body3">Du har mottatt en faktura fra Singsaker Studenterhjem. Spørsmål vedrørende fakturaen rettes til Singsaker Studenterhjem. Fakturaen kan hentes fram med nettleseren din via denne lenken:</Typography>
      </Paper>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h4">Kalender</Typography>
      <Paper elevation={10} sx={{ width: "100%", py: 2, my: 2, bgcolor: "grey.800", height: 390 }}>
        <HomeCalendar members={data.allMembers} />
      </Paper>
      <Divider sx={{ my: 2, mb: 8 }} />
    </>
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