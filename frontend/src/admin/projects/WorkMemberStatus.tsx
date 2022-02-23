import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import ProjectType, { ProjectMemberProps } from "@src/types/project"
import parseDuration from "@utils/parseDuration"
import { Gear } from "phosphor-react"
import { useState } from "react"
import NewProjectMemberDialog from "./NewProjectMemberDialog"
import ProjectMemberEditDialog from "./ProjectMemberEditDialog"

interface Props {
  project: ProjectType
}

const WorkMemberStatus = ({ project }: Props) => {
  const [semesterDialog, setSemesterDialog] = useState(false);
  const [newMemberDialog, setNewMemberDialog] = useState(false)
  const [member, setMember] = useState<ProjectMemberProps>();

  const handleMemberClickOpen = (member: ProjectMemberProps) => {
    setMember(member)
    setSemesterDialog(true);
  };

  const handleMemberClose = () => setSemesterDialog(false);

  const handleNewMemberOpen = () => setNewMemberDialog(true)

  const handleNewMemberClose = () => setNewMemberDialog(false)

  return (
    <>
      <Button fullWidth sx={{ mb: 2 }} variant="outlined" color="inherit" onClick={handleNewMemberOpen}>Nytt prosjektmedlem</Button>
      <Box sx={{ width: "100%", overflow: "scroll" }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>
                Navn
              </TableCell>
              <TableCell>
                Totalt
              </TableCell>
              {/* <TableCell>
                Avventer
              </TableCell>
              <TableCell>
                Godkjent
              </TableCell> */}
              <TableCell>
                Gjenstående
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {project?.projectMembers.map((member: ProjectMemberProps) => (
              <TableRow key={member.id}>
                <TableCell>{member.member.firstName} {member.member.lastName}</TableCell>
                <TableCell>{member.allocatedTime}t</TableCell>
                {/* <TableCell>{parseDuration(member.workPending)}</TableCell> */}
                {/* <TableCell>{parseDuration(member.workApproved)}</TableCell> */}
                <TableCell>{parseDuration(Math.max(member.allocatedTime * 60 * 60 - (parseInt(member.workApproved) || 0), 0))}</TableCell>
                <TableCell sx={{ pl: 0 }}>
                  <IconButton onClick={() => handleMemberClickOpen(member)}>
                    <Gear size="20" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <NewProjectMemberDialog project={project?.id} open={newMemberDialog} handleClose={handleNewMemberClose} />
      <ProjectMemberEditDialog project={project?.id} open={semesterDialog} handleClose={handleMemberClose} member={member} />
    </>
  )
}

export default WorkMemberStatus