import { useAuthentication } from "@api/authentication";
import { useQuery } from "@apollo/client";
import { GET_SHIFT_DATES } from "@graphql/reception/queries";
import { Box, Button, Card, CardHeader, Chip, LinearProgress, Stack, styled, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import { ShiftDateProps, ShiftProps } from "@src/types/shift";
import BaseOptionChart from "@theme/charts";
import { ApexOptions } from "apexcharts";
import dateFormat from "dateformat";
import deepmerge from "deepmerge";
import dynamic from 'next/dynamic';
import NextLink from "next/link";


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MainCardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  // color: theme.palette.grey[900],
  // backgroundColor: theme.palette.secondary.lighter
}));

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
      data: shifts.map((shift) => ({ "x": shift[1].shiftType + " Vakt", "y": [new Date(shift[0]).getTime(), new Date(shift[0]).getTime() + (6 * 60 * 60 * 1000)] }))
    }
  ]

  const chartOptions: ApexOptions = deepmerge({
    chart: {
      type: 'rangeBar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '100%'
      }
    },
    colors: [theme.palette.secondary.main],
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
        borderWidth: 2,
      }]
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
    legend: {
      show: false,
    }
  }, BaseOptionChart())

  return (
    <MainCardStyle>
      <CardHeader title="Dine vakter" subheader="Her kan du se en oversikt over dine vakter" />
      <Box sx={{ mx: 3, pb: 2 }}>
        <div id="chart">
          <Chart options={chartOptions} series={chartSeries} type="rangeBar" height={130} />
        </div>
        <Table size="small" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 1 }}>Dato</TableCell>
              <TableCell align="center">Vakttype</TableCell>
              <TableCell align="right" sx={{ pr: 0.5 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift[0]}>
                <TableCell sx={{ pl: 1 }}>
                  {dateFormat(new Date(shift[0]), "dd.mm")}
                </TableCell>
                <TableCell align="center">
                  <Chip label={shift[1].shiftType} />
                </TableCell>
                <TableCell align="right" sx={{ pr: 0.5 }}>
                  {new Date(shift[0]) < new Date() ? (
                    <Chip color="success" size="small" label="Fullført" />
                  ) : (
                    <Chip color="error" size="small" label="Ikke fullført" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack spacing={2} direction="row" my={1}>
          <Button variant="contained" fullWidth>Bytt vakt</Button>
          <NextLink href={"/work/shifts"} passHref>
            <Button variant="outlined" color="inherit" fullWidth>Se alle vakter</Button>
          </NextLink>
        </Stack>
      </Box>
    </MainCardStyle>
  )
}

export default ShiftModule;