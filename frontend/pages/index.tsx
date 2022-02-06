import { useAuthentication } from '@api/authentication';
import { useQuery } from "@apollo/client";
import Loading from '@components/Loading';
import { GET_MEMBERS } from "@graphql/members/queries";
import { Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";

export default function Home() {
  const { data, loading, error } = useQuery(GET_MEMBERS)
  const { userDetails } = useAuthentication();

  if (loading) {
    return <Loading />
  }

  return (
    <main>
      <DashboardLayout>
        <Typography variant="h2" component="h1" gutterBottom>Hei {userDetails?.username}</Typography>
        <Typography variant="h4">Kunngjøringer</Typography>
        <Paper sx={{ my: 2 }}>
          <Typography variant="body3">Du har mottatt en faktura fra Singsaker Studenterhjem. Spørsmål vedrørende fakturaen rettes til Singsaker Studenterhjem. Fakturaen kan hentes fram med nettleseren din via denne lenken:</Typography>
        </Paper>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h4">Kalender</Typography>
        <ul>
          {data.allMembers.map((member: { id: number, firstName?: string, lastName?: string }) => {
            return <li key={member.id}>{member.firstName + " " + member.lastName}</li>
          })}
        </ul>
      </DashboardLayout>
    </main>
  )
}