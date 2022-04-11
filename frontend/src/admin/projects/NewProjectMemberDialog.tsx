
import { useMutation, useQuery } from "@apollo/client";
import { GET_MEMBERS } from "@graphql/members/queries";
import { CREATE_PROJECT_MEMBER } from "@graphql/projects/mutations";
import { GET_PROJECT } from "@graphql/projects/queries";
import { AppBar, Autocomplete, Box, Button, Dialog, DialogActions, Divider, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { MemberProps } from "@src/types/user";
import shape from "@theme/shape";
import { X } from 'phosphor-react';
import { Controller, useForm } from "react-hook-form";

export interface DialogProps {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  project?: number;
}

const NewProjectMemberDialog = (props: DialogProps) => {
  const { open, project, handleClose, ...other } = props;
  const { data: membersData, loading: membersLoading } = useQuery(GET_MEMBERS);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [createProjectMember] = useMutation(CREATE_PROJECT_MEMBER, {
    refetchQueries: [GET_PROJECT]
  });

  const onSubmit = (data: any) => {
    createProjectMember({
      variables: {
        project: project,
        member: data.member.id,
        allocatedTime: data.allocatedTime
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
      PaperProps={{ sx: { overflow: "visible" } }}
    >
      <AppBar color="inherit" elevation={0} variant="outlined"
        sx={{ position: 'relative', borderTopLeftRadius: shape.borderRadiusSm, borderTopRightRadius: shape.borderRadiusSm }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <X size="24px" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Nytt prosjektmedlem
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
            {!membersLoading && (
              <Controller
                name="member"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Autocomplete
                      disablePortal
                      value={value}
                      isOptionEqualToValue={(option, value) => option.id == value.id}
                      onChange={(event, value) => onChange(value)}
                      options={membersData.allMembers.map((member: MemberProps) => (
                        { "label": member.firstName + " " + member.lastName, "id": member.id }
                      ))}
                      renderInput={(params) => <TextField {...params} error={!!errors.year} label="Beboer" />}
                    />
                  </>
                )}
              />
            )}
            <TextField
              error={!!errors.allocatedTime}
              placeholder="Regitimer"
              label="Regitimer"
              fullWidth
              variant="standard"
              size="small"
              {...register('allocatedTime', { required: true })}
            />
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <DialogActions>
            <Button type="submit" fullWidth color="secondary" variant="contained">
              Legg til
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default NewProjectMemberDialog;
