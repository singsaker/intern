import { useMutation, useQuery } from "@apollo/client"
import { CLEAR_SEMESTER } from "@graphql/reception/mutations"
import { GET_SHIFT_DATES } from "@graphql/reception/queries"
import DashboardLayout from "@layouts/dashboard"
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material"
import GenerateShiftsDialog from "@src/admin/reception/GenerateShiftsDialog"
import ReceptionCalendar from "@src/admin/reception/ReceptionCalendar"
import ReceptionShiftView from "@src/admin/reception/ReceptionShiftView"
import { useState } from "react"


const ReceptionAdminPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data, loading } = useQuery(GET_SHIFT_DATES, { variables: { semester: 1 } })
  const [clearSemester] = useMutation(CLEAR_SEMESTER, { variables: { semester: 1 }, refetchQueries: [GET_SHIFT_DATES] })

  const [generateShiftsDialogOpen, setGenerateShiftsDialogOpen] = useState(false)

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h3">Vakter</Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => clearSemester()} color="error" variant="outlined">Tøm</Button>
          <Button onClick={() => setGenerateShiftsDialogOpen(true)} variant="outlined" color="inherit">Generer</Button>
        </Stack>
      </Stack>
      {loading && (
        <LinearProgress color="secondary" variant="indeterminate" sx={{ width: 1 }} />
      )}
      <Box mb={3}>
        {!loading && (<ReceptionCalendar selectedDate={selectedDate} setDate={setSelectedDate} shifts={data.allShiftDates} />)}
      </Box>
      {!loading && selectedDate && (<ReceptionShiftView date={selectedDate} shifts={data.allShiftDates} />)}
      <GenerateShiftsDialog semester={1} open={generateShiftsDialogOpen} handleClose={() => setGenerateShiftsDialogOpen(false)} />
    </>
  )
}

ReceptionAdminPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout admin title="Utvalget intern">
      {page}
    </DashboardLayout>
  )
}

export default ReceptionAdminPage