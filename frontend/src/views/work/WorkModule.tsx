import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_PROJECT_MEMBER, GET_TOTAL_TIME_SPENT } from "@graphql/projects/queries";
import { Box, Button, Chip, FormControl, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography, useTheme } from "@mui/material";
import { remToPx } from "@theme/typography";
import parseDuration from "@utils/parseDuration";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import ProjectType from "src/types/project";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


// REGI: Oversiktblokk
const WorkModule = () => {
  // Hent alle regiprosjekter
  const { data, loading, error } = useQuery(GET_PROJECTS);

  const theme = useTheme();

  // Hent bruker
  const { userDetails } = useAuthentication();

  // Selekterte prosjekt
  const [project, setProject] = useState<number>(0);

  // Hent totalt utførte tid
  const [fetchTime, { data: timeData, loading: timeLoading }] = useLazyQuery(GET_TOTAL_TIME_SPENT,
    { variables: { project: project, member: userDetails?.member.id } });

  // Hent antall timer tildelt
  const [fetchProjectMember, { data: projectMemberData, loading: projectMemberLoading }] = useLazyQuery(GET_PROJECT_MEMBER,
    { variables: { project: project, member: userDetails?.member.id } });

  // Utfør queries når selekterte prosjekt eller brukerdetaljer endres
  useEffect(() => {
    if (project && userDetails) {
      fetchTime();
      fetchProjectMember();
    } else if (data) {
      setProject(data.allProjects[0].id)
    }
  }, [project, userDetails, data]);

  // Håndter Select endringer
  const handleChange = (event: SelectChangeEvent<number>) => {
    setProject(event.target.value as number);
  };

  if (loading || timeLoading || projectMemberLoading || !timeData || !projectMemberData) {
    return <></>
  }

  const chartSeries = [
    (projectMemberData.projectMember?.allocatedTime | 0) * 60 * 60 - parseInt(timeData.totalTimeSpent),
    parseInt(timeData.totalTimeSpent)
  ]

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    grid: {
      borderColor: "transparent"
    },
    stroke: {
      colors: ['transparent']
    },
    dataLabels: {
      enabled: false,
    },
    colors: [theme.palette.primary.light, theme.palette.secondary.main],
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '85%',
          labels: {
            show: true,
            value: {
              show: true,
              formatter: function (val) {
                return parseDuration(val)
              },
              ...(theme.typography.h4 as any),
              color: theme.palette.text.primary,
            },
            name: {
              show: true
            },
            total: {
              color: theme.palette.text.secondary,
              ...(theme.typography.subtitle1 as any),
              show: true,
              label: 'Totale timer',
              formatter: function (val) {
                if (projectMemberData?.projectMember) {
                  return parseDuration((projectMemberData.projectMember.allocatedTime * 60 * 60))
                } else {
                  return ""
                }
              }
            }
          }
        }
      }
    },
    labels: ['Utførte timer', "Gjenstående timer"],
    legend: {
      show: false,
      position: 'top',
      offsetY: 0,
      ...(theme.typography.body3 as any),
      color: theme.palette.text.disabled,
      fontSize: remToPx(theme.typography.body3.fontSize + ""),
      fontWeight: 600,
      itemMargin: {
        horizontal: 10
      },
      fontFamily: theme.typography.fontFamily,
      markers: {
        offsetX: -3
      }
    }
  }

  return (
    <Paper sx={{ mb: 2, bgcolor: "transparent" }}>
      <Stack sx={{ mb: 3 }} spacing={3}>
        <Typography variant="h3">Min regi</Typography>
        {!loading && (
          <FormControl color="info" variant="standard" fullWidth>
            <Select
              defaultValue={data.allProjects[0].id}
              value={project}
              label="Velg prosjekt"
              onChange={handleChange}
            >
              {!loading && data.allProjects.map((project: ProjectType) => (
                <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

      {(timeLoading || projectMemberLoading) ? (
        <></>
      ) : (
        projectMemberData?.projectMember ? (
          <>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Chip
                avatar={
                  <Chip
                    sx={{ width: "fit-content!important", color: "common.white", bgcolor: "primary.light" }}
                    label={
                      <Typography fontWeight={600} variant="body3">
                        {parseDuration(parseInt(timeData.totalTimeSpent))}
                      </Typography>
                    } />
                }
                label={<Typography fontWeight={600} variant="body3">Utført</Typography>}
                variant="outlined"
              />
              <Chip
                avatar={
                  <Chip
                    sx={{ width: "fit-content!important", color: "common.white", bgcolor: "secondary.main" }}
                    label={
                      <Typography fontWeight={600} variant="body3" sx={{ color: "common.white" }}>
                        {parseDuration((projectMemberData.projectMember?.allocatedTime | 0) * 60 * 60 - parseInt(timeData.totalTimeSpent))}
                      </Typography>
                    } />
                }
                label={<Typography fontWeight={600} variant="body3">Gjenstående</Typography>}
                variant="outlined"
              />
            </Stack>
            <Box my={2} id="chart">
              <Chart options={chartOptions} series={chartSeries} type="donut" height={300} />
            </Box>
            <Stack spacing={2} direction="row" sx={{ my: 1 }}>
              <NextLink href={"/work/register?project=" + project} passHref>
                <Button color="secondary" variant="contained" fullWidth>Registrer regi</Button>
              </NextLink>
              <NextLink href={"/work/registered?project=" + project} passHref>
                <Button variant="outlined" color="inherit" fullWidth>Se detaljer</Button>
              </NextLink>
            </Stack>
          </>
        ) : (
          <Typography sx={{ my: 2 }}>Du deltar ikke i dette regiprosjektet</Typography>
        ))}
    </Paper>
  )
}

export default WorkModule;