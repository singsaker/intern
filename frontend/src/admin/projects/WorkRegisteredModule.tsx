import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { DELETE_WORK, UPDATE_WORK } from "@graphql/projects/mutations";
import { GET_WORK } from "@graphql/projects/queries";
import { AppBar, Button, Container, Dialog, DialogActions, IconButton, Slide, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { WorkProps } from "@src/types/project";
import parseDuration from "@utils/parseDuration";
import parseWorkStatus from "@utils/parseWorkStatus";
import dateFormat from "dateformat";
import { X } from 'phosphor-react';
import { forwardRef, useEffect, useState } from "react";

const WorkRegisteredModule = ({ project }: any) => {
  // Hent registrert regi
  const { data: workData, loading: workLoading } = useQuery(GET_WORK,
    { variables: { project: project } });

  const [work, setWork] = useState<WorkProps | undefined>(undefined);

  const handleClickOpen = (work: WorkProps) => {
    setWork(work);
  };

  const handleClose = () => {
    setWork(undefined);
  };

  return (
    <>
      <Typography variant="h4" sx={{ my: 2 }}>Registrert regi</Typography>
      <Stack spacing={2}>
        {!workLoading && workData?.allWork.map((work: WorkProps) => (
          <Stack component="button" onClick={() => handleClickOpen(work)} key={work.id} spacing={2} direction="row">
            <Typography>{dateFormat(work.registerDate, "dd/mm")}</Typography>
            <Typography>{work.description}</Typography>
            <Typography>{parseWorkStatus(work.status)}</Typography>
            <Typography>{parseDuration(work.duration)}</Typography>
          </Stack>
        ))}
        {workData?.allWork.length == 0 && "Ingen registrert regi"}
      </Stack>
      <WorkDialog open={!!work} work={work} handleClose={handleClose} project={project} />
    </>
  )
}

export interface DialogProps {
  work?: WorkProps;
  children?: React.ReactNode;
  open: boolean;
  project: number;
  handleClose: () => void;
}

const WorkDialog = (props: DialogProps) => {
  const { work, project, open, handleClose, ...other } = props;

  const [status, setStatus] = useState<number | null>();

  const handleStatus = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: number | null,
  ) => {
    setStatus(newStatus);
  };

  const [fetchWork] = useLazyQuery(GET_WORK,
    { variables: { project: project, work: work?.id } });

  useEffect(() => {
    fetchWork()
    setStatus(work?.status)
  }, [work])

  const [updateWork] = useMutation(UPDATE_WORK, {
    variables: { id: work?.id, workData: { status: status } },
  })

  const [deleteWork] = useMutation(DELETE_WORK, {
    variables: { id: work?.id },
  })

  const handleDelete = () => {
    handleClose()
    deleteWork();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      fullWidth
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <X size="24px" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Registrert regi
          </Typography>

        </Toolbar>
      </AppBar>
      <Container>
        <Stack spacing={2} sx={{ py: 3 }}>
          <Typography variant="body2"><b>Utført av</b>: {work?.member?.firstName} {work?.member?.lastName}</Typography>
          <Typography variant="body2"><b>Registrert</b>: {dateFormat(work?.registerDate, "dd.mm")}</Typography>
          <Typography variant="body2"><b>Utført</b>: {work?.executionDate && dateFormat(work?.executionDate, "dd.mm")}</Typography>
          <Typography variant="body2"><b>Kommentar</b>: {work?.description}</Typography>
          <Typography variant="body2"><b>Tid brukt</b>: {work?.duration && parseDuration(work?.duration)}</Typography>
          <Typography variant="body2"><b>Status</b></Typography>
          <ToggleButtonGroup
            color="primary"
            size="small"
            value={status}
            exclusive
            onChange={handleStatus}
            aria-label="text alignment"
          >
            <ToggleButton value={1} aria-label="left aligned">
              Ubehandlet
            </ToggleButton>
            <ToggleButton value={2} aria-label="centered">
              Godkjent
            </ToggleButton>
            <ToggleButton value={3} aria-label="right aligned">
              Underkjent
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Container>
      <DialogActions>
        <Button color="error" onClick={handleDelete}>
          Slett
        </Button>
        <Button variant="contained" onClick={() => updateWork()}>
          Lagre
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default WorkRegisteredModule;