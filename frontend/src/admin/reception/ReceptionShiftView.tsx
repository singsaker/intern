import { Button, IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { ShiftDateProps, ShiftProps } from "@src/types/shift"
import { format, isSameDay } from 'date-fns'
import { nb } from 'date-fns/locale'
import { Gear } from "phosphor-react"
import { useState } from "react"
import EditShiftDialog from "./EditShiftDialog"
import NewShiftDialog from "./NewShiftDialog"

interface Props {
  date: Date,
  shifts: Array<ShiftDateProps>
}

const ReceptionShiftView = ({ date, shifts }: Props) => {
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [type, setType] = useState(1)
  const [shiftID, setShiftID] = useState<number>()

  const handleNewOpen = (type: number) => {
    setType(type)
    setNewOpen(true)
  }

  const handleEditOpen = (id: number) => {
    setShiftID(id)
    setEditOpen(true)
  }

  const selectedShift = shifts.find(shift => isSameDay(new Date(shift.date), date))

  const shiftsObject = selectedShift?.shifts?.reduce((obj: any, item: ShiftProps) => Object.assign(obj, { [item.shiftType]: { ...item } }), {})

  const getMemberName = (number: number) => {
    const firstName = shiftsObject[number]?.member.firstName || ""
    const lastName = shiftsObject[number]?.member.lastName || ""

    return firstName + " " + lastName
  }

  return (
    <>
      <Typography variant="h4" sx={{ textTransform: "capitalize", mb: 2, textAlign: "center" }}>
        {format(date, "EEEE dd.MM", { locale: nb })}
      </Typography>
      <Table sx={{ width: "100%" }} size="small">
        <TableBody>
          {(new Array(4)).fill(0).map((value, index) => (
            <TableRow>
              <TableCell width={40}>
                <Typography variant="body3"><b>{index + 1}</b></Typography>
              </TableCell>

              {(!shiftsObject || !shiftsObject[index + 1]) ? (
                <>
                  <TableCell width="100%">
                    <Button onClick={() => handleNewOpen(index + 1)} variant="outlined" color="inherit" size="small" sx={{ my: 0.5 }}>Legg til vakt</Button>
                  </TableCell>
                  <TableCell align="right" />
                </>
              ) : (
                <>
                  <TableCell>
                    <Typography>{getMemberName(index + 1)}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEditOpen(shiftsObject[index + 1].id)}>
                      <Gear />
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {shiftID && (<EditShiftDialog id={shiftID} open={editOpen} handleClose={() => setEditOpen(false)} />)}
      <NewShiftDialog type={type} open={newOpen} handleClose={() => setNewOpen(false)} semester={1} date={date} />
    </>
  )
}

export default ReceptionShiftView