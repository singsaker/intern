import { useQuery } from "@apollo/client"
import { GET_SHIFT_DATES } from "@graphql/reception/queries"
import AdminLayout from "@layouts/admin"
import DashboardLayout from "@layouts/dashboard"
import { Box, Typography } from "@mui/material"
import ReceptionCalendar from "@src/admin/reception/ReceptionCalendar"
import ReceptionShiftView from "@src/admin/reception/ReceptionShiftView"
import { useState } from "react"


const ReceptionAdminPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data, loading } = useQuery(GET_SHIFT_DATES, { variables: { semester: 1 } })

  return (
    <>
      <Typography variant="h3" sx={{ mb: 3 }}>Vaktsemester</Typography>
      <Box mb={3}>
        {!loading && (<ReceptionCalendar selectedDate={selectedDate} setDate={setSelectedDate} shifts={data.allShiftDates} />)}
      </Box>
      {!loading && selectedDate && (<ReceptionShiftView date={selectedDate} shifts={data.allShiftDates} />)}
    </>
  )
}

ReceptionAdminPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout admin title="Utvalget intern">
      <AdminLayout>{page}</AdminLayout>
    </DashboardLayout>
  )
}

export default ReceptionAdminPage