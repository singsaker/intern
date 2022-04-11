
import { useMutation } from "@apollo/client";
import { DELETE_WORK, UPDATE_WORK } from "@graphql/projects/mutations";
import { GET_WORK } from "@graphql/projects/queries";
import { AppBar, Box, Button, Dialog, DialogActions, Divider, IconButton, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from "@mui/material";
import { WorkProps } from "@src/types/project";
import parseDuration from "@utils/parseDuration";
import dateFormat from "dateformat";
import { Trash, X } from 'phosphor-react';
import { useEffect, useState } from "react";

export interface DialogProps {
  work?: WorkProps;
  children?: React.ReactNode;
  open: boolean;
  project: number;
  handleClose: () => void;
}

const WorkEditDialog = (props: DialogProps) => {
  const { work, project, open, handleClose, ...other } = props;

  const [status, setStatus] = useState<number | null>();

  const handleStatus = (event: React.MouseEvent<HTMLElement>, newStatus: number | null) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  useEffect(() => {
    if (open) setStatus(work?.status);
  }, [open]);

  const [updateWork] = useMutation(UPDATE_WORK, {
    variables: { id: work?.id, workData: { status: status } },
    update: (cache) => {
      const existingData = cache.readQuery<any>({
        query: GET_WORK,
        variables: { project: project }
      });
      const newData = existingData.allWork.map((item: WorkProps) => {
        if (item.id === work?.id) {
          return { ...item };
        } else {
          return item;
        }
      });

      cache.writeQuery({
        query: GET_WORK,
        variables: { project: project },
        data: { allWork: newData }
      });
    },
    refetchQueries: ["totalTimeSpent"],
  });

  const [deleteWork] = useMutation(DELETE_WORK, {
    variables: { id: work?.id },
    update: (cache) => {
      const normalizedId = cache.identify({ id: work?.id, __typename: 'WorkType' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  const handleDelete = () => {
    handleClose();
    deleteWork();
  };

  const handleUpdate = () => {
    handleClose();
    updateWork();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      fullWidth
    >
      <AppBar color="inherit" variant="outlined" sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <X size="24px" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Registrert regi
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={3} pt={0}>
        <Stack spacing={2} sx={{ py: 3 }}>
          <Typography variant="body2">
            <b>Utført av</b>: {work?.member?.firstName} {work?.member?.lastName}
          </Typography>
          <Typography variant="body2">
            <b>Registrert</b>: {dateFormat(work?.registerDate, 'dd.mm')}
          </Typography>
          <Typography variant="body2">
            <b>Utført</b>: {work?.executionDate && dateFormat(work?.executionDate, 'dd.mm')}
          </Typography>
          <Typography variant="body2">
            <b>Kommentar</b>: {work?.description}
          </Typography>
          <Typography variant="body2">
            <b>Tid brukt</b>: {work?.duration && parseDuration(work?.duration)}
          </Typography>
          <Typography variant="body2">
            <b>Status</b>
          </Typography>
          <ToggleButtonGroup
            color="secondary"
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
        <Divider sx={{ mb: 2 }} />
        <DialogActions>
          <IconButton sx={{ mr: 2 }} edge="start" onClick={handleDelete}>
            <Trash size={20} />
          </IconButton>
          <Button fullWidth color="secondary" variant="contained" onClick={handleUpdate}>
            Lagre
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default WorkEditDialog;
