import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS, GET_TOTAL_TIME_SPENT } from "@graphql/projects/queries";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from "@mui/material";
import parseDuration from "@utils/parseDuration";
import { useEffect, useState } from "react";
import ProjectType from "src/types/project";
import WorkRegisteredModule from "./WorkRegisteredModule";

// REGI: Oversiktblokk
const WorkModule = () => {
  // Hent alle regiprosjekter
  const { data, loading, error } = useQuery(GET_PROJECTS);

  // Hent bruker
  const { userDetails } = useAuthentication();

  // Selekterte prosjekt
  const [project, setProject] = useState<number>(0);

  // Hent totalt utførte tid
  const [fetchTime, { data: timeData, loading: timeLoading }] = useLazyQuery(GET_TOTAL_TIME_SPENT,
    { variables: { project: project } });

  // Hent prosjekt
  const [fetchProject, { data: projectData, loading: projectLoading }] = useLazyQuery(GET_PROJECT,
    { variables: { id: project } });

  // Utfør queries når selekterte prosjekt eller brukerdetaljer endres
  useEffect(() => {
    if (project && userDetails) {
      fetchTime();
      fetchProject();
    } else if (data) {
      setProject(data.allProjects[0].id)
    }
  }, [project, userDetails, data]);

  // Håndter Select endringer
  const handleChange = (event: SelectChangeEvent<number>) => {
    setProject(event.target.value as number);
  };

  return (
    <Box my={2}>
      <Typography variant="h3" sx={{ mb: 3 }}>Arbeid</Typography>
      {!loading && (
        <FormControl variant="standard" fullWidth size="small">
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
      {(timeLoading || projectLoading) ? (
        <Skeleton animation="wave" sx={{ my: 2 }} variant="rectangular" height={70} />
      ) : (
        (!timeLoading && !loading && !projectLoading) ? (
          <>
            <Box py={2}>
              <Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body3">Totalt:</Typography>
                  <Typography variant="body3"><b>{parseDuration((projectData?.project.hours * 60 * 60))}</b></Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body3">Utført:</Typography>
                  <Typography variant="body3"><b>{timeData && parseDuration(timeData.totalTimeSpent)}</b></Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body3">Gjenstående:</Typography>
                  <Typography variant="body3"><b>{timeData && parseDuration(Math.max(projectData?.project.hours * 60 * 60 - (timeData.totalTimeSpent | 0), 0))}</b></Typography>
                </Stack>
              </Stack>
            </Box>
          </>
        ) : (
          <Typography sx={{ my: 2 }}>Du deltar ikke i dette regiprosjektet</Typography>
        ))}
      <WorkRegisteredModule project={project} />
    </Box>
  )
}

export default WorkModule;