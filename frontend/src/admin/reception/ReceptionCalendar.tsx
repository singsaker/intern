import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ShiftDateProps, ShiftProps } from "@src/types/shift";
import { getDate, getDay, getMonth, getYear, isSameDay } from "date-fns";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";


interface DotProps {
  start?: boolean
  end?: boolean
  active?: boolean
}

const Dot = styled("div", {
  shouldForwardProp: (prop) => prop !== 'start' && prop !== 'end' && prop !== 'active'
})<DotProps>(({ start, end, active, theme }) => ({
  width: 10,
  height: 10,
  backgroundColor: active ? theme.palette.grey[900] : theme.palette.grey[300],
  borderRadius: (end && "0 50% 50% 0" || start && "50% 0 0 50%") || "0",
  marginLeft: -1,
}))

const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
const days = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"]

interface Props {
  setDate: (date: Date) => void
  selectedDate?: Date
  shifts: Array<ShiftDateProps>
}

const ReceptionCalendar = ({ setDate, selectedDate, shifts }: Props) => {
  const currentDate = new Date()
  const [month, setMonth] = useState(getMonth(currentDate) + 1);

  const increaseMonth = () => month == 12 ? setMonth(1) : setMonth(month + 1)
  const decreaseMonth = () => month == 1 ? setMonth(12) : setMonth(month - 1)

  const getDaysInMonth = (month: number, year: number) => {
    return (new Array(31)).fill(undefined).map((v, i) => (
      { date: new Date(year, month - 1, i + 1) }
    )).filter(v => v.date.getMonth() === month - 1)
  }

  const mapShiftsToMonth = (month: number, year: number) => {
    return getDaysInMonth(month, year).map(item => ({ ...shifts.find(shift => isSameDay(new Date(shift.date), item.date)), ...item }))
  }

  const getWeeksInMonth = (month: number, year: number) => {
    const days = mapShiftsToMonth(month, year)
    const dayOfWeek = (getDay(days[0].date) + 6) % 7 // Use 0 as monday instead of sunday
    const daysEmptySlots = getDay(dayOfWeek) == 0 ? days : [...Array(dayOfWeek).fill(undefined), ...days]

    return [...Array(Math.ceil(daysEmptySlots.length / 7))].map(_ => daysEmptySlots.splice(0, 7))
  }

  const setToday = () => {
    setMonth(getMonth(currentDate) + 1)
    setDate(currentDate)
  }

  return (
    <Paper sx={{}} >
      <Stack component={Paper} direction="row" sx={{ bgcolor: "grey.900", color: "common.white", justifyContent: "space-between", alignItems: "center", p: 1.5, px: 3, mb: 2 }}>
        <Typography variant="h4">{months[month - 1]}</Typography>
        <Stack direction="row">
          <IconButton onClick={decreaseMonth}>
            <CaretLeft />
          </IconButton>
          <Button onClick={setToday} color="inherit">I dag</Button>
          <IconButton onClick={increaseMonth} edge="end">
            <CaretRight />
          </IconButton>
        </Stack>
      </Stack>
      <Table sx={{ width: "100%", tableLayout: "fixed" }} size="small">
        <TableHead>
          <TableRow>
            {days.map((day: string) => (
              <TableCell key={day} sx={{ textAlign: "center", px: 0 }}>{day.substring(0, 3)}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {getWeeksInMonth(month, getYear(currentDate)).map((week, i) => {
            return (
              <TableRow key={i}>
                {week.map((day, i) => {
                  const shifts = day?.shifts?.reduce((obj: any, item: ShiftProps) => Object.assign(obj, { [item.shiftType]: { ...item } }), {})

                  return (
                    <TableCell key={i} sx={{ textAlign: "center", px: 0, py: 1, borderBottom: 0 }}>
                      {day ? (
                        <Button fullWidth
                          color="inherit"
                          variant={(selectedDate && isSameDay(selectedDate, day.date)) ? "contained" : "text"}
                          sx={{ display: "block", px: 0, py: 0, minWidth: 0 }} onClick={() => setDate(day.date)}>
                          <Typography variant="body3">{getDate(day.date)}</Typography>
                          <Stack direction="row" sx={{ width: "100%", justifyContent: "center", mb: 0.8, mt: 0.5 }}>
                            <Dot start active={shifts && shifts[1]} />
                            <Dot active={shifts && shifts[2]} />
                            <Dot active={shifts && shifts[3]} />
                            <Dot end active={shifts && shifts[4]} />
                          </Stack>
                        </Button>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}



export default ReceptionCalendar