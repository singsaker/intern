import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_WORK } from "@graphql/projects/queries";
import DashboardLayout from "@layouts/dashboard";
import { Card, Chip, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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
    <Container>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dato registrert</TableCell>
              <TableCell>Dato utført</TableCell>
              <TableCell>Beskrivelse</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!workLoading && workData?.allWork.map((work: WorkProps) => (
              <TableRow key={work.id}>
                <TableCell>{dateFormat(work.registerDate, "dd.mm.yy")}</TableCell>
                <TableCell>{dateFormat(work.executionDate, "dd.mm.yy")}</TableCell>
                <TableCell>{work.description}</TableCell>
                <TableCell>
                  {work.status == 1 && (
                    <Chip label="Ubehandlet" />
                  )}
                  {work.status == 2 && (
                    <Chip color="success" label="Godkjent" />
                  )}
                  {work.status == 3 && (
                    <Chip color="error" label="Underkjent" />
                  )}
                </TableCell>
                <TableCell>{parseDuration(work.duration)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
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