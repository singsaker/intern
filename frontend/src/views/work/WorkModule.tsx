import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_PROJECT_MEMBER, GET_TOTAL_TIME_SPENT } from "@graphql/projects/queries";
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import parse from 'parse-duration';
import { useEffect, useState } from "react";
import ProjectType from "src/types/project";

// NB: Bør skrives om
const parseDuration = (duration: string) => {
  let res = duration.split(", ")
  let length = res.length

  if (length > 1) {
    return ((parse(res[0], 'hr') + parseInt(res[1].split(":")[0])) + " timer, " + res[1].split(":")[1] + " minutter")
  } else {
    return res[0].split(":")[0] + " timer, " + res[0].split(":")[1] + " minutter"
  }
}

// REGI: Oversiktblokk
const WorkModule = () => {
  // Hent alle regiprosjekter
  const { data, loading, error } = useQuery(GET_PROJECTS);

  // Hent bruker
  const { userDetails } = useAuthentication();

  // Selekterte prosjekt
  const [project, setProject] = useState("");

  // Hent totalt utførte tid
  const [fetchTime, { data: timeData }] = useLazyQuery(GET_TOTAL_TIME_SPENT,
    { variables: { project: project, member: userDetails?.member.id } });

  // Hent antall timer tildelt
  const [fetchProjectMember, { data: projectMemberData }] = useLazyQuery(GET_PROJECT_MEMBER,
    { variables: { project: project, member: userDetails?.member.id } });

  // Utfør queries når selekterte prosjekt eller brukerdetaljer endres
  useEffect(() => {
    if (project && userDetails) {
      fetchTime();
      fetchProjectMember();
    }
  }, [project, userDetails]);

  // Håndter Select endringer
  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  return (
    <Box my={2}>
      <Typography variant="h3" sx={{ mb: 3 }}>Min regi</Typography>
      <FormControl variant="standard" fullWidth size="small">
        <Select
          value={project}
          label="Velg prosjekt"
          onChange={handleChange}
        >
          {!loading && data.allProjects.map((project: ProjectType) => (
            <MenuItem value={project.id}>{project.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
      {projectMemberData?.projectMember ? (
        <>
          <Box py={2}>
            <Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="body3">Totalt:</Typography>
                <Typography variant="body3"><b>{projectMemberData?.projectMember && projectMemberData.projectMember.allocatedTime}</b></Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="body3">Utført:</Typography>
                <Typography variant="body3"><b>{timeData && parseDuration(timeData.totalTimeSpent)}</b></Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack spacing={2} direction="row">
            <NextLink href={"/work/register?project=" + project} passHref>
              <Button variant="contained" fullWidth>Registrer regi</Button>
            </NextLink>
            <Button variant="outlined" color="inherit" fullWidth>Se detaljer</Button>
          </Stack>
        </>
      ) : (<Typography sx={{ my: 2 }}>Du deltar ikke i dette regiprosjektet</Typography>)}
    </Box>
  )
}

export default WorkModule;