import { useAuthentication } from "@api/authentication";
import { useQuery } from "@apollo/client";
import { GET_SHIFT_DATES } from "@graphql/reception/queries";
import { Button, Chip, LinearProgress, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ShiftDateProps, ShiftProps } from "@src/types/shift";
import { ApexOptions } from "apexcharts";
import dateFormat from "dateformat";
import dynamic from 'next/dynamic';
import NextLink from "next/link";


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// VAKTER: Oversiktblokk
const ShiftModule = () => {
  const theme = useTheme()
  const { userDetails } = useAuthentication()
  const { data, loading } = useQuery(GET_SHIFT_DATES, { variables: { semester: 1, member: userDetails?.member?.id } })

  if (loading) {
    return <LinearProgress sx={{ width: 1 }} variant="indeterminate" />
  }

  const shifts: [[string, ShiftProps]] = data?.allShiftDates.map((item: ShiftDateProps) => [item.date, item.shifts.find(shift => shift.member?.id == userDetails?.member?.id)])

  const chartSeries = [
    {
      data: shifts.map((shift) => ({ "x": "Vakt", "y": [new Date(shift[0]).getTime(), new Date(shift[0]).getTime() + (6 * 60 * 60 * 1000)] }))
    }
  ]

  const chartOptions: ApexOptions = {
    chart: {
      height: 100,
      type: 'rangeBar',
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%'
      }
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false
      },
      crosshairs: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: theme.palette.text.disabled,
        },
      },
      axisBorder: {
        show: false
      },
      crosshairs: {
        show: false,
      }
    },
    annotations: {
      xaxis: [{
        x: new Date().getTime(),
        strokeDashArray: 0,
        borderColor: theme.palette.primary.main,
        borderWidth: 3,
      }]
    },
    tooltip: {
      x: {
        format: "yyyy",
      },
      fixed: {
        enabled: false,
        position: 'topRight'
      }
    },
    grid: {
      yaxis: {
        lines: {
          show: false
        }
      },
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    stroke: {
      width: 3
    },
    fill: {
      type: 'solid',
      opacity: 0.6
    },
    legend: {
      show: false,
    }
  }

  return (
    <Paper sx={{ bgcolor: "grey.200", p: 2, mb: 12 }}>
      <Typography variant="h3">Mine vakter</Typography>
      <div id="chart">
        <Chart options={chartOptions} series={chartSeries} type="rangeBar" height={100} />
      </div>
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 1 }}>Dato</TableCell>
            <TableCell>Vakttype</TableCell>
            <TableCell sx={{ pr: 0.5 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.map((shift) => (
            <TableRow key={shift[0]}>
              <TableCell sx={{ pl: 1 }}>
                {dateFormat(new Date(shift[0]), "dd / mm")}
              </TableCell>
              <TableCell align="center">
                <Chip label={shift[1].shiftType} />
              </TableCell>
              <TableCell align="right" sx={{ pr: 0.5 }}>
                {new Date(shift[0]) < new Date() ? (
                  <Chip color="success" variant="outlined" label="Fullført" />
                ) : (
                  <Chip color="info" variant="outlined" label="Ikke fullført" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack spacing={2} direction="row" my={1}>
        <Button variant="contained" color="secondary" fullWidth>Bytt vakt</Button>
        <NextLink href={"/work/shifts"} passHref>
          <Button variant="outlined" color="inherit" fullWidth>Se alle vakter</Button>
        </NextLink>
      </Stack>
    </Paper>
  )
}

export default ShiftModule;