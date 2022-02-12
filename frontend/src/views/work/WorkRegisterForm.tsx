import { useAuthentication } from '@api/authentication';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_WORK } from "@graphql/projects/mutations";
import { GET_WORK_CATEGORIES } from '@graphql/projects/queries';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { WorkCategoryProps } from 'src/types/project';

const WorkRegisterForm = ({ project }: any) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { userDetails } = useAuthentication();

  // Velg dato
  const [date, setDate] = useState<Date | null>(null);

  // Hent regikategorier
  const { data: categoryData, loading: categoryLoading } = useQuery(GET_WORK_CATEGORIES);

  const [createWork] = useMutation(CREATE_WORK);

  const onSubmit = (data: any) => {
    if (userDetails?.member.id) {
      createWork({
        variables: {
          workData: {
            project: project,
            member: userDetails?.member.id,
            taskCategory: data.category,
            description: data.description,
            duration: data.duration
          }
        }
      })
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        my={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          {!categoryLoading && (
            <Controller
              name="category"
              defaultValue={categoryData.allWorkCategories[0].id}
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl variant="standard" size="small" fullWidth>
                  <InputLabel id="category-label">Kategori</InputLabel>
                  <Select
                    error={!!errors.category}
                    labelId="category-label"
                    value={value}
                    label="Kategori"
                    onChange={onChange}
                  >
                    {!categoryLoading && categoryData?.allWorkCategories.map((category: WorkCategoryProps) => (
                      <MenuItem key={category.name} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          )}

          <DatePicker
            label="Dato utført"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => (
              <TextField error={!!errors.date} fullWidth variant="standard" size="small" {...params} {...register('date', { required: true })} />
            )}
          />
          <TextField
            error={!!errors.duration}
            placeholder="0:00"
            label="Tid brukt"
            fullWidth
            variant="standard"
            size="small"
            {...register('duration', { required: true })}
          />
          <TextField
            error={!!errors.description}
            label="Kommentar"
            multiline
            rows={5}
            {...register('description', { required: true })}
          />
        </Stack>
        <Divider />
        <Stack sx={{ my: 2 }} direction="row" spacing={2}>
          <Button size="large" variant="contained" type="submit">Send inn</Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  )
}

export default WorkRegisterForm