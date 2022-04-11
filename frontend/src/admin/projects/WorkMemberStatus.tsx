import { useMutation } from "@apollo/client"
import { UPDATE_PROJECT_MEMBER } from "@graphql/projects/mutations"
import { GET_PROJECTS } from "@graphql/projects/queries"
import { Box, Button, IconButton, LinearProgress, Stack, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueSetterParams } from "@mui/x-data-grid"
import ProjectType, { ProjectMemberProps } from "@src/types/project"
import parseDuration from "@utils/parseDuration"
import { DotsThreeVertical } from "phosphor-react"
import { useState } from "react"
import NewProjectMemberDialog from "./NewProjectMemberDialog"
import ProjectMemberEditDialog from "./ProjectMemberEditDialog"

interface Props {
  project: ProjectType
}


const WorkMemberStatus = ({ project }: Props) => {
  const [semesterDialog, setSemesterDialog] = useState(false);
  const [newMemberDialog, setNewMemberDialog] = useState(false);
  const [pageSize, setPageSize] = useState<number>(15);
  const [member, setMember] = useState<ProjectMemberProps>();

  const [updateProjectMember] = useMutation(UPDATE_PROJECT_MEMBER, {
    update: (cache) => {
      const existingData = cache.readQuery<any>({
        query: GET_PROJECTS,
        variables: { project: project.id }
      });
      const newData = existingData.allProjects.map((item: ProjectType) => {
        if (item.id == project.id) {
          return { ...item };
        } else {
          return item;
        }
      });

      cache.writeQuery({
        query: GET_PROJECTS,
        variables: { project: project.id },
        data: { allProjects: newData }
      });
    },
  });

  const handleMemberClickOpen = (member: ProjectMemberProps) => {
    setMember(member)
    setSemesterDialog(true);
  };

  const setTotalTime = (params: GridValueSetterParams) => {
    updateProjectMember({
      variables: {
        id: params.row.id,
        allocatedTime: params.value
      }
    })

    return { ...params.row, total: params.value };
  }

  const handleMemberClose = () => setSemesterDialog(false);

  const handleNewMemberOpen = () => setNewMemberDialog(true)

  const handleNewMemberClose = () => setNewMemberDialog(false)

  const rows: GridRowsProp = project?.projectMembers.map(item => {
    return {
      id: item.id,
      name: item.member.firstName + " " + item.member.lastName,
      total: item.allocatedTime,
      remaining: { "allocated": item.allocatedTime, "approved": item.workApproved },
      edit: item
    }
  })

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Navn',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'total',
      headerName: 'Totalt',
      flex: 1,
      type: "number",
      editable: true,
      valueSetter: setTotalTime,
      renderCell: (params: GridRenderCellParams<number>) => (params.value + "t")
    },
    {
      field: 'remaining',
      headerName: 'Igjen',
      flex: 1,
      minWidth: 70,
      sortComparator: (a: any, b: any) => b.approved - a.approved,
      renderCell: (params: GridRenderCellParams<any>) => {
        const allocated = params.value.allocated * 60 * 60
        const approved = parseInt(params.value.approved)
        const percentage = (Math.min(approved, allocated) / allocated) * 100
        return (
          <Stack direction="column" sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="caption" sx={{ position: "absolute", zIndex: 100, color: "common.black" }}>{parseDuration(Math.max(allocated - (approved || 0), 0)) || "0t"}</Typography>
            <LinearProgress color={percentage == 100 ? "success" : "warning"} variant="determinate" value={percentage} sx={{ height: "30px", width: "100%" }} />
          </Stack>
        )
      },
    },
    {
      field: "edit",
      type: "actions",
      width: 10,
      minWidth: 20,
      renderCell: (params: GridRenderCellParams<ProjectMemberProps>) => (
        <IconButton onClick={() => { if (params.value) { handleMemberClickOpen(params.value) } }}>
          <DotsThreeVertical size="24" />
        </IconButton>
      ),
    }
  ];

  return (
    <>
      <Button fullWidth sx={{ mb: 2 }} variant="outlined" color="inherit" onClick={handleNewMemberOpen}>Nytt prosjektmedlem</Button>
      <Box sx={{ width: "100%" }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            {(rows.length != 0) && (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                autoHeight
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[15, 50]}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'name', sort: 'asc' }],
                  },
                }}
              />
            )}
          </div>
        </div>
      </Box>
      <NewProjectMemberDialog project={project?.id} open={newMemberDialog} handleClose={handleNewMemberClose} />
      <ProjectMemberEditDialog project={project?.id} open={semesterDialog} handleClose={handleMemberClose} member={member} />
    </>
  )
}

export default WorkMemberStatus