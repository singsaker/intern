import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

// VAKTER: Oversiktblokk
const ShiftModule = () => {
  return (
    <>
      <Typography variant="h3" sx={{ mb: 3 }}>Vakt</Typography>
      <Typography sx={{ my: 2 }}>Du skal ikke sitte vakt</Typography>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="secondary" fullWidth>Bytt vakt</Button>
        <NextLink href={"/work/shifts"} passHref>
          <Button variant="outlined" color="inherit" fullWidth>Se alle vakter</Button>
        </NextLink>
      </Stack>
    </>
  )
}

export default ShiftModule;