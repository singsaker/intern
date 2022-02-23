import DashboardLayout from "@layouts/dashboard";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import ShiftWeek from "src/views/work/ShiftWeek";


const Shifts = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <Button startIcon={<ArrowLeft />} onClick={() => router.back()} color="inherit" variant="outlined">Returner</Button>
      <Typography variant="h3" sx={{ my: 2 }}>Alle vakter</Typography>
      <Stack spacing={3} sx={{ my: 2 }}>
        <ShiftWeek week={1} />
        <ShiftWeek week={2} />
        <ShiftWeek week={3} />
      </Stack>
    </DashboardLayout>
  )
}

export default Shifts;