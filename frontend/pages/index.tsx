import { useAuthentication } from '@api/authentication';
import LoginForm from '@components/authentication/login/LoginForm';
import Layout from '@components/Layout';
import Logo from '@components/Logo';
import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function Home() {
  const { useData } = useAuthentication()
  const { username } = useData();

  return (
    <Layout>
      <main>
        {username ? (<h1>Velkommen {username}</h1>) : (
          <>
            <Logo sx={{ mb: 2 }} />
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                Logg inn
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Singsaker Studenterhjem internside.</Typography>
            </Stack>
            <LoginForm />
          </>
        )}
      </main>
    </Layout>
  )
}