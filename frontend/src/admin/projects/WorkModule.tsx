import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS, GET_TOTAL_TIME_SPENT } from "@graphql/projects/queries";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, FormControl, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, Stack, Typography } from "@mui/material";
import parseDuration from "@utils/parseDuration";
import { CaretDown, Gear, X } from "phosphor-react";
import { useEffect, useState } from "react";
import ProjectType from "src/types/project";
import ProjectsEdit from "./ProjectsEdit";
import WorkMemberStatus from "./WorkMemberStatus";
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
    } else if (data && data.allProjects[0]) {
      setProject(data.allProjects[0].id)
    }
  }, [loading, userDetails, project]);

  // Håndter Select endringer
  const handleChange = (event: SelectChangeEvent<number>) => {
    setProject(event.target.value as number);
  };

  const [editProjects, setEditProjects] = useState(false)

  return (
    <Box mb={2}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h3">Prosjekter</Typography>
        <IconButton onClick={() => setEditProjects(!editProjects)}>
          {editProjects ? <X /> : <Gear />}
        </IconButton>
      </Stack>
      {
        editProjects ? (
          <ProjectsEdit />
        ) : (
          <>
            {!loading && (
              <FormControl fullWidth >
                <Select
                  defaultValue={data.allProjects[0]?.id}
                  value={project}
                  onChange={handleChange}
                >
                  {!loading && data.allProjects.map((project: ProjectType) => (
                    <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Paper elevation={18} sx={{ p: 3, my: 4, bgcolor: "grey.900", color: "common.white" }}>

              {(timeLoading || projectLoading) ? (
                <Skeleton animation="wave" sx={{ my: 2 }} variant="rectangular" height={79} />
              ) : (
                (!timeLoading && !loading && !projectLoading) ? (
                  <Stack spacing={2}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                      <Typography variant="body2">Totalt:</Typography>
                      <Typography variant="h6"><b>{parseDuration((projectData?.project.hours * 60 * 60))}</b></Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                      <Typography variant="body2">Utført:</Typography>
                      <Typography variant="h6"><b>{timeData && parseDuration(timeData.totalTimeSpent)}</b></Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                      <Typography variant="body2">Gjenstående:</Typography>
                      <Typography variant="h6"><b>{timeData && parseDuration(Math.max(projectData?.project.hours * 60 * 60 - (timeData.totalTimeSpent | 0), 0))}</b></Typography>
                    </Stack>
                  </Stack>
                ) : (
                  <Typography sx={{ my: 2 }}>Du deltar ikke i dette regiprosjektet</Typography>
                ))}
            </Paper>
            <Card sx={{ px: 2 }}>
              <Accordion sx={{ bgcolor: "transparent" }}>
                <AccordionSummary sx={{ px: 1 }} expandIcon={<CaretDown />}        >
                  <Typography variant="h4" sx={{ my: 1 }}>Prosjektmedlemmer</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1 }}>
                  {projectData && <WorkMemberStatus project={projectData.project} />}
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ bgcolor: "transparent" }}>
                <AccordionSummary sx={{ px: 1 }} expandIcon={<CaretDown />}>
                  <Typography variant="h4" sx={{ my: 1 }}>Registrert arbeid</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1 }}>
                  {projectData && <WorkRegisteredModule project={projectData.project} />}
                </AccordionDetails>
              </Accordion>
            </Card>
          </>
        )
      }
    </Box >
  )
}

export default WorkModule;