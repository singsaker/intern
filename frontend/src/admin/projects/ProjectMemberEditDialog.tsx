import { useMutation } from "@apollo/client"
import { DELETE_PROJECT_MEMBER, UPDATE_PROJECT_MEMBER } from "@graphql/projects/mutations"
import { GET_PROJECTS } from "@graphql/projects/queries"
import { AppBar, Box, Button, Dialog, DialogActions, Divider, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material"
import ProjectType, { ProjectMemberProps } from "@src/types/project"
import { Trash, X } from "phosphor-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export interface DialogProps {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  member?: ProjectMemberProps;
  project?: number;
}

const ProjectMemberEditDialog = (props: DialogProps) => {
  const { open, member, project, handleClose, ...other } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (member) setValue("hours", member.allocatedTime)
  }, [member])

  const [updateProjectMember] = useMutation(UPDATE_PROJECT_MEMBER, {
    update: (cache) => {
      const existingData = cache.readQuery<any>({
        query: GET_PROJECTS,
        variables: { project: project }
      });
      const newData = existingData.allProjects.map((item: ProjectType) => {
        if (item.id == project) {
          return { ...item };
        } else {
          return item;
        }
      });

      cache.writeQuery({
        query: GET_PROJECTS,
        variables: { project: project },
        data: { allProjects: newData }
      });
    },
  });

  const [deleteProjectMember] = useMutation(DELETE_PROJECT_MEMBER, {
    variables: { id: member?.id },
    update: (cache) => {
      const normalizedId = cache.identify({ id: member?.id, __typename: 'ProjectMemberType' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  const handleDelete = () => {
    handleClose();
    deleteProjectMember();
  };

  const onSubmit = (data: any) => {
    updateProjectMember({
      variables: {
        id: member?.id,
        allocatedTime: data.hours
      }
    })
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      fullWidth
    >
      <AppBar color="inherit" elevation={0} variant="outlined" sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <X size="24px" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Rediger prosjektmedlem
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={3} pt={0}>
        <Box
          pt={3}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <Typography>Medlem: <b>{member?.member.firstName} {member?.member.lastName}</b></Typography>
            <TextField
              error={!!errors.hours}
              placeholder="Totale timer"
              label="Totale timer"
              fullWidth
              variant="standard"
              size="small"
              {...register('hours', { required: true })}
            />
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <DialogActions>
            <IconButton sx={{ mr: 2 }} edge="start" onClick={handleDelete}>
              <Trash size={20} />
            </IconButton>
            <Button type="submit" fullWidth color="secondary" variant="contained">
              Lagre
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProjectMemberEditDialog