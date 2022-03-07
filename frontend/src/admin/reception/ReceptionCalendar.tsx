import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ShiftDateProps, ShiftProps } from "@src/types/shift";
import { getDate, getDay, getMonth, getYear, isSameDay } from "date-fns";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";


interface DotProps {
  middle?: boolean
  end?: boolean
  active?: boolean
}

const Dot = styled("div")<DotProps>(({ theme, middle, end, active }) => ({
  width: 10,
  height: 10,
  backgroundColor: active ? theme.palette.grey[900] : theme.palette.grey[300],
  borderRadius: middle ? "0" : (end ? "0 50% 50% 0" : "50% 0 0 50%"),
  marginLeft: -1,
}))

const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]

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
    const daysEmptySlots = getDay(days[0].date) == 0 ? days : [...Array(getDay(days[0].date) - 1).fill(undefined), ...days]

    return [...Array(Math.ceil(daysEmptySlots.length / 7))].map(_ => daysEmptySlots.splice(0, 7))
  }

  return (
    <Paper sx={{ bgcolor: "grey.200", p: 1.5 }} >
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <IconButton onClick={decreaseMonth}>
          <CaretLeft />
        </IconButton>
        <Typography variant="h4">{months[month - 1]}</Typography>
        <IconButton onClick={increaseMonth}>
          <CaretRight />
        </IconButton>
      </Stack>
      <Table sx={{ width: "100%", tableLayout: "fixed" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center", px: 0 }}>Tir</TableCell>
            <TableCell sx={{ textAlign: "center", px: 0 }}>Ons</TableCell>
            <TableCell sx={{ textAlign: "center", px: 0 }}>Man</TableCell>
            <TableCell sx={{ textAlign: "center", px: 0 }}>Tor</TableCell>
            <TableCell sx={{ textAlign: "center", px: 0 }}>Fre</TableCell>
            <TableCell sx={{ textAlign: "center", px: 0 }}>Lør</TableCell>
            <TableCell sx={{ textAlign: "center", px: 0 }}>Søn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getWeeksInMonth(month, getYear(currentDate)).map(week => {
            return (
              <TableRow>
                {week.map(day => {
                  const shifts = day?.shifts?.reduce((obj: any, item: ShiftProps) => Object.assign(obj, { [item.shiftType]: { ...item } }), {})

                  return (
                    <TableCell sx={{ textAlign: "center", px: 0, py: 1, borderBottom: 0 }}>
                      {day && (
                        <Button fullWidth
                          color={"inherit"}
                          variant={(selectedDate && isSameDay(selectedDate, day.date)) ? "contained" : "text"}
                          sx={{ display: "block", px: 0, py: 0, minWidth: 0 }} onClick={() => setDate(day.date)}>
                          <Typography variant="body3">{getDate(day.date)}</Typography>
                          <Stack direction="row" sx={{ width: "100%", justifyContent: "center", mb: 0.8, mt: 0.5 }}>
                            <Dot active={shifts && shifts[1]} />
                            <Dot middle active={shifts && shifts[2]} />
                            <Dot middle active={shifts && shifts[3]} />
                            <Dot end active={shifts && shifts[4]} />
                          </Stack>
                        </Button>
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