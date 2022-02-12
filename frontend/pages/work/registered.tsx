import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_WORK } from "@graphql/projects/queries";
import DashboardLayout from "@layouts/dashboard";
import { Button, Stack, Typography } from "@mui/material";
import parseDuration from "@utils/parseDuration";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { useEffect } from "react";
import { WorkProps } from "src/types/project";

const RegisteredWork = () => {
  const router = useRouter();
  const { project } = router.query;

  // Hent bruker
  const { userDetails } = useAuthentication();

  // Hent prosjekt
  const { data: projectData, loading: projectLoading } = useQuery(GET_PROJECT,
    { variables: { id: project } });

  // Hent registrert regi
  const [fetchWork, { data: workData, loading: workLoading }] = useLazyQuery(GET_WORK,
    { variables: { project: project, member: userDetails?.member.id } });

  // Utfør queries når brukerdetaljer endres
  useEffect(() => {
    if (userDetails) {
      fetchWork();
    }
  }, [userDetails]);

  return (
    <DashboardLayout>
      <Button startIcon={<ArrowLeft />} onClick={() => router.back()} color="inherit" variant="outlined">Returner</Button>
      <Typography variant="h3" sx={{ my: 2 }}>{!projectLoading && projectData?.project.name}: Registrert regi</Typography>
      <Stack spacing={2}>
        {!workLoading && workData?.allWork.map((work: WorkProps) => (
          <Stack key={work.id} spacing={2} direction="row">
            <Typography>{dateFormat(work.registerDate, "dd.mm.yy")}</Typography>
            <Typography>{dateFormat(work.executionDate, "dd.mm.yy")}</Typography>
            <Typography>{work.description}</Typography>
            <Typography>{work.status}</Typography>
            <Typography>{parseDuration(work.duration)}</Typography>
          </Stack>
        ))}
      </Stack>
    </DashboardLayout>
  )
}

export default RegisteredWork;