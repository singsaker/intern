import { useAuthentication } from '@api/authentication';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from "@graphql/projects/queries";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";


export default function Work() {
  const { userDetails } = useAuthentication()
  const router = useRouter()
  const { project } = router.query

  // Hent prosjekt
  const { data: projectData, loading } = useQuery(GET_PROJECT,
    { variables: { id: project } });

  return (
    <DashboardLayout>
      <Button onClick={() => router.back()} color="inherit" variant="outlined">Returner</Button>
      <Typography variant="h3" sx={{ my: 2 }}>Registrer regi</Typography>
      <Typography>Regiprosjekt: <b>{!loading && projectData.project.name}</b></Typography>
      <Box component="form" my={2}>
        <InputLabel>Kategori</InputLabel>
        <FormControl variant="standard" fullWidth size="small">
          <Select
            value={1}
            label="Kategori"
          >
            <MenuItem value={1}>Generelt</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body3" sx={{ my: 2 }}>Dato</Typography>
        <br />
        <Typography variant="body3" sx={{ my: 2 }}>Tid</Typography>
        <br />
        <Typography variant="body3" sx={{ my: 2 }}>Kommentar</Typography>
      </Box>
      <Divider />
      <Stack sx={{ my: 2 }} direction="row" spacing={2}>
        <Button variant="contained">Send inn</Button>
        <Button variant="outlined" disabled color="inherit">Lagre som kladd</Button>
      </Stack>
    </DashboardLayout>
  )
}