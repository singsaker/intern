import { useQuery } from "@apollo/client";
import { GET_WORK } from "@graphql/projects/queries";
import { Button, IconButton, Table, TableCell, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import ProjectType, { WorkProps } from "@src/types/project";
import parseDuration from "@utils/parseDuration";
import dateFormat from "dateformat";
import { Gear } from "phosphor-react";
import { useState } from "react";
import NewWorkDialog from "./NewWorkDialog";
import WorkEditDialog from "./WorkEditDialog";

interface Props {
  project: ProjectType;
}

const WorkRegisteredModule = ({ project }: Props) => {
  // Hent registrert regi
  const { data: workData, loading: workLoading } = useQuery(GET_WORK,
    { variables: { project: project?.id } });

  const [work, setWork] = useState<WorkProps | undefined>(undefined);
  const [workEditDialog, setWorkEditDialog] = useState(false)
  const [newWorkDialog, setNewWorkDialog] = useState(false)

  const handleNewWorkOpen = () => setNewWorkDialog(true)
  const handleNewWorkClose = () => setNewWorkDialog(false)

  const handleSetEditDialogOpen = (work: WorkProps) => {
    setWork(work)
    setWorkEditDialog(true)
  }
  const handleSetEditDialogClose = () => setWorkEditDialog(false)

  return (
    <>
      <Button fullWidth sx={{ mb: 2 }} variant="outlined" color="inherit" onClick={handleNewWorkOpen}>Registrer regi</Button>

      <Box width="100%" sx={{ overflow: "scroll" }}>
        <Table>
          {(!workLoading && workData) && workData.allWork.map((work: WorkProps) => (
            <TableRow key={work.id} sx={{
              borderLeft: "4px solid lightgray",
              ...(work.status != 1 && {
                borderColor: (work.status == 2 ? "success.main" : "error.main")
              })
            }}>
              <TableCell sx={{ pr: 0 }}>
                <IconButton onClick={() => handleSetEditDialogOpen(work)}>
                  <Gear size="20" />
                </IconButton>
              </TableCell>
              <TableCell >{dateFormat(work.registerDate, "dd/mm")}</TableCell>
              <TableCell>{work.member.firstName}</TableCell>
              <TableCell>{parseDuration(work.duration)}</TableCell>
            </TableRow>
          ))}
          {workData?.allWork.length == 0 && "Ingen registrert regi"}
        </Table>
      </Box>
      <NewWorkDialog open={newWorkDialog} project={project} handleClose={handleNewWorkClose} />
      <WorkEditDialog open={workEditDialog} work={work} handleClose={handleSetEditDialogClose} project={project.id} />
    </>
  )
}

export default WorkRegisteredModule;