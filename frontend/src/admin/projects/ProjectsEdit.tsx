import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "@graphql/projects/queries";
import { Button, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ProjectsGenerateSemesterDialog from "@src/admin/projects/ProjectsGenerateSemesterDialog";
import ProjectType from "@src/types/project";
import { DotsThreeVertical } from "phosphor-react";
import { useState } from "react";

const ProjectsEdit = () => {
  // Hent alle regiprosjekter
  const { data: projectsData, loading: projectsLoading } = useQuery(GET_PROJECTS);

  const [semesterDialog, setSemesterDialog] = useState(false);

  const handleClickOpen = () => {
    setSemesterDialog(true);
  };

  const handleClose = () => {
    setSemesterDialog(false);
  };

  return (
    <>
      <Table size="small" sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              Navn
            </TableCell>
            <TableCell align="right">
              Aktiv
            </TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {!projectsLoading && projectsData.allProjects.map((project: ProjectType) => (
            <TableRow key={project.id}>
              <TableCell>
                {project.name}
              </TableCell>
              <TableCell align="right">
                <Checkbox />
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <DotsThreeVertical />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Generer semesterprosjekt
      </Button>
      <ProjectsGenerateSemesterDialog open={semesterDialog} handleClose={handleClose} />
    </>
  )
}

export default ProjectsEdit