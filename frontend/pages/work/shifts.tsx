import { useQuery } from "@apollo/client";
import { GET_SHIFT_DATES } from "@graphql/reception/queries";
import DashboardLayout from "@layouts/dashboard";
import { Box } from "@mui/material";
import ReceptionCalendar from "@src/admin/reception/ReceptionCalendar";
import ReceptionShiftView from "@src/admin/reception/ReceptionShiftView";
import { useRouter } from "next/router";
import { useState } from "react";


const ShiftsPage = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data, loading } = useQuery(GET_SHIFT_DATES, { variables: { semester: 1 } })

  return (
    <>
      {!loading && (<ReceptionCalendar selectedDate={selectedDate} setDate={setSelectedDate} shifts={data.allShiftDates} />)}
      <Box my={2} />
      {!loading && selectedDate && (<ReceptionShiftView date={selectedDate} shifts={data.allShiftDates} />)}
    </>
  )
}

ShiftsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout title="Alle vakter" back>
      {page}
    </DashboardLayout>
  )
}

export default ShiftsPage;