
import { AppBar, Autocomplete, Box, Dialog, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import ProjectType, { ProjectMemberProps } from "@src/types/project";
import WorkRegisterForm from "@src/views/work/WorkRegisterForm";
import { X } from 'phosphor-react';
import { forwardRef, useState } from "react";

export interface DialogProps {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  project?: ProjectType;
}

const NewWorkDialog = (props: DialogProps) => {
  const { open, project, handleClose, ...other } = props;

  // Beboervalg
  const [value, setValue] = useState<{ label: string; id: number; } | null>(null);
  const [inputValue, setInputValue] = useState('');

  console.log(value)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      fullScreen
      TransitionComponent={Transition}
    >
      <AppBar color="inherit" elevation={0} variant="outlined" sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <X size="24px" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Registrer regi
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        {project && (
          <>
            <Autocomplete
              sx={{ mb: 3 }}
              disablePortal
              value={value}
              onChange={(event: any, newValue: { label: string; id: number; } | null) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={project.projectMembers.map((projectMember: ProjectMemberProps) => (
                { "label": projectMember.member.firstName + " " + projectMember.member.lastName, "id": projectMember.member.id }
              ))}
              renderInput={(params) => <TextField variant="standard" {...params} label="Beboer" />}
            />
            {value && <WorkRegisterForm project={project.id} memberId={value?.id} onComplete={handleClose} />}
          </>
        )}
      </Box>
    </Dialog >
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default NewWorkDialog;
