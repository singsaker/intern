import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_WORK } from "@graphql/projects/queries";
import DashboardLayout from "@layouts/dashboard";
import { Stack, Typography } from "@mui/material";
import parseDuration from "@utils/parseDuration";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { WorkProps } from "src/types/project";

const RegisteredWorkPage = () => {
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
    <>
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
    </>
  )
}

RegisteredWorkPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout title="Registrert regi" back>
      {page}
    </DashboardLayout>
  )
}

export default RegisteredWorkPage;