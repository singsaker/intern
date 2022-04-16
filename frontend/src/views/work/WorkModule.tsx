import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_PROJECT_MEMBER, GET_TOTAL_TIME_SPENT } from "@graphql/projects/queries";
import { Box, Button, Card, CardHeader, FormControl, LinearProgress, MenuItem, Select, SelectChangeEvent, Stack, styled, Typography, useTheme } from "@mui/material";
import BaseOptionChart from "@theme/charts";
import parseDuration from "@utils/parseDuration";
import { ApexOptions } from "apexcharts";
import deepmerge from "deepmerge";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import ProjectType from "src/types/project";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(1, 2),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.dark
}));

const MainCardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  color: theme.palette.grey[900],
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(1),
  },
  backgroundColor: theme.palette.primary.lighter
}));


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
    return <LinearProgress variant="indeterminate" />
  }

  const chartSeries: ApexNonAxisChartSeries = [
    parseFloat((100 * parseInt(timeData.totalTimeSpent) / ((projectMemberData.projectMember?.allocatedTime | 0) * 60 * 60)).toFixed(1)),
  ]

  const chartOptions: ApexOptions = deepmerge(BaseOptionChart(), {
    chart: {
      type: 'radialBar',
      selection: {
        enabled: false,
      }
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "15px",
            color: "white"
          }
        },
        hollow: {
          size: '60%',
          labels: {
            show: true,
          }
        }
      }
    },
    labels: ["awd"],
    legend: {
      show: false,
    }
  })

  return (
    <MainCardStyle>
      <CardHeader title="Din regi" subheader="Her kan du se en oversikt over din regi" />
      <Box sx={{ mx: 3, pb: 2 }}>
        <Stack sx={{ mb: 2, mt: 2 }} spacing={3}>
          {!loading && (
            <FormControl color="primary" fullWidth>
              <Select
                sx={{ color: "grey.900" }}
                defaultValue={data.allProjects[0].id}
                value={project}
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
              {/* <Stack direction="row" spacing={2} justifyContent="center">
                <Chip
                  avatar={
                    <Chip
                      sx={{ width: "fit-content!important", color: "common.white", bgcolor: "primary.main" }}
                      label={
                        <Typography fontWeight={600} variant="body3" sx={{ color: "common.white" }}>
                          {parseDuration(parseInt(timeData.totalTimeSpent))}
                        </Typography>
                      } />
                  }
                  label={<Typography fontWeight={600} variant="caption" >Utført</Typography>}
                  variant="outlined"
                />
                <Chip
                  avatar={
                    <Chip
                      sx={{ width: "fit-content!important", color: "common.white", bgcolor: (theme) => theme.palette.chart.yellow[0] }}
                      label={
                        <Typography fontWeight={600} variant="body3">
                          {parseDuration((projectMemberData.projectMember?.allocatedTime | 0) * 60 * 60 - parseInt(timeData.totalTimeSpent))}
                        </Typography>
                      } />
                  }
                  label={<Typography fontWeight={600} variant="caption">Gjenstående</Typography>}
                  variant="outlined"
                />
              </Stack> */}
              <Box my={2} id="chart">
                <CardStyle>
                  <Stack direction="row" spacing={2} alignItems="center" textAlign="left">
                    <Chart options={chartOptions} series={chartSeries} type="radialBar" height={140} width={90} />
                    <div>
                      <Typography variant="h4">{parseDuration((projectMemberData.projectMember?.allocatedTime | 0) * 60 * 60 - parseInt(timeData.totalTimeSpent))}</Typography>
                      <Typography color="primary.light" variant="body3">Gjenstående regi</Typography>
                    </div>
                  </Stack>
                </CardStyle>
              </Box>
              <Stack spacing={2} direction="row" sx={{ my: 1 }}>
                <NextLink href={"/work/register?project=" + project} passHref>
                  <Button color="primary" variant="contained" fullWidth>Registrer regi</Button>
                </NextLink>
                <NextLink href={"/work/registered?project=" + project} passHref>
                  <Button variant="outlined" color="inherit" fullWidth>Se detaljer</Button>
                </NextLink>
              </Stack>
            </>
          ) : (
            <Typography variant="body1" sx={{ my: 2 }}>Du deltar ikke i dette regiprosjektet</Typography>
          ))}
      </Box>
    </MainCardStyle>
  )
}

export default WorkModule;