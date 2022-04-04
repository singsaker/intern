
import { useMutation } from "@apollo/client";
import { GENERATE_SHIFTS } from "@graphql/reception/mutations";
import { GET_SHIFT_DATES } from "@graphql/reception/queries";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Alert, AppBar, Box, Button, Dialog, DialogActions, Divider, IconButton, Snackbar, Stack, TextField, Toolbar, Typography } from "@mui/material";
import shape from "@theme/shape";
import dateFormat from "dateformat";
import { X } from 'phosphor-react';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export interface DialogProps {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  semester: number;
}

const GenerateShiftsDialog = (props: DialogProps) => {
  const { open, semester, handleClose, ...other } = props;
  const [startDateState, setStartDateState] = useState<Date | null>(null)
  const [endDateState, setEndDateState] = useState<Date | null>(null)
  const [timer, setTimer] = useState(0)
  const tick: { current: NodeJS.Timeout | null } = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [generateShifts, { loading, data }] = useMutation(GENERATE_SHIFTS, {
    refetchQueries: [GET_SHIFT_DATES]
  });

  const onSubmit = (data: any) => {
    generateShifts({
      variables: {
        semester: semester,
        startDate: dateFormat(data.startDate, "yyyy-mm-dd"),
        endDate: dateFormat(data.endDate, "yyyy-mm-dd")
      }
    })
    handleClose();
    tick.current = setInterval(() => { // <-- set tick ref current value
      setTimer((timer) => +((timer + 0.1).toFixed(1)));
    }, 100);
  }

  const [infoAlert, setInfoAlert] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)

  useEffect(() => {
    if (loading) {
      setInfoAlert(true)
    }
  }, [loading])

  useEffect(() => {
    if (data) {
      handleInfoClose()
      setSuccessAlert(true)
    }
  }, [loading])

  const handleInfoClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    clearInterval(tick.current as NodeJS.Timeout)
    setTimer(0)
    setInfoAlert(false);
  };

  return (
    <>
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
              Generer vakter
            </Typography>
          </Toolbar>
        </AppBar>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box p={3} pt={0}>
            <Box
              pt={3}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={3}>
                <Typography sx={{ color: "secondary" }}>
                  Dette verktøyet brukes til å generere vakter. Vaktene genereres så rettferdig som mulig.
                  <br /><b>Eksisterende vakter overskrives.</b>
                </Typography>
                <DatePicker
                  label="Startdato"
                  value={startDateState}
                  onChange={(newValue) => {
                    setStartDateState(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField error={!!errors.startDate} fullWidth {...params} {...register('startDate', { required: true })} />
                  )}
                />
                <DatePicker
                  label="Sluttdato"
                  value={endDateState}
                  onChange={(newValue) => {
                    setEndDateState(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField error={!!errors.endDate} fullWidth {...params} {...register('endDate', { required: true })} />
                  )}
                />
              </Stack>
              <Divider sx={{ my: 2 }} />
              <DialogActions>
                <Button type="submit" fullWidth color="secondary" variant="contained">
                  Generer
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </LocalizationProvider>
      </Dialog>
      <Snackbar open={infoAlert} onClose={handleInfoClose}>
        <Alert onClose={handleInfoClose} variant="filled" severity="info" sx={{ width: '100%' }}>
          Genererer vakter. {timer}s
        </Alert>
      </Snackbar>
      <Snackbar open={successAlert} onClose={() => setSuccessAlert(false)} autoHideDuration={6000}>
        <Alert variant="filled" onClose={() => setSuccessAlert(false)} severity="success" sx={{ width: '100%' }}>
          Vakter generert
        </Alert>
      </Snackbar>
    </>
  );
};

export default GenerateShiftsDialog;
