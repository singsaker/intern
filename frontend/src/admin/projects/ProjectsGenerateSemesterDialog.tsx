
import { useMutation, useQuery } from "@apollo/client";
import { GENERATE_SEMESTER_PROJECT } from "@graphql/projects/mutations";
import { GET_PROJECTS, GET_PROJECT_CATEGORIES } from "@graphql/projects/queries";
import { AppBar, Box, Button, Dialog, DialogActions, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { ProjectCategoryProps } from "@src/types/project";
import { X } from 'phosphor-react';
import { Controller, useForm } from "react-hook-form";

export interface DialogProps {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const ProjectsGenerateSemesterDialog = (props: DialogProps) => {
  const { open, handleClose, ...other } = props;
  const { data: projectCategoriesData, loading: projectCategoriesLoading } = useQuery(GET_PROJECT_CATEGORIES);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [generateSemesterProject] = useMutation(GENERATE_SEMESTER_PROJECT, {
    update: (cache, { data }) => {
      const newDataFromResponse = data?.generateSemesterProject.project
      const existingData = cache.readQuery<any>({
        query: GET_PROJECTS,
      });

      // Update cache
      if (existingData && newDataFromResponse) {
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            allProjects: [
              ...existingData?.allProjects,
              newDataFromResponse,
            ],
          },
        });
      }
    }
  }
  );

  const onSubmit = (data: any) => {
    generateSemesterProject({
      variables: {
        projectData: {
          name: data.semester + " " + data.year,
          projectCategory: data.category
        }
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
            Generer semesterprosjekt
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
            {!projectCategoriesLoading && (
              <Controller
                name="category"
                defaultValue={projectCategoriesData.allProjectCategories[0].id}
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
                      {!projectCategoriesLoading && projectCategoriesData?.allProjectCategories.map((category: ProjectCategoryProps) => (
                        <MenuItem key={category.name} value={category.id}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            )}
            <TextField
              error={!!errors.year}
              placeholder="År"
              label="År"
              fullWidth
              variant="standard"
              size="small"
              {...register('year', { required: true })}
            />
            <TextField
              error={!!errors.semester}
              placeholder="Semester"
              label="Semester"
              fullWidth
              variant="standard"
              size="small"
              {...register('semester', { required: true })}
            />

          </Stack>
          <Divider sx={{ mb: 2 }} />
          <DialogActions>
            <Button type="submit" fullWidth color="secondary" variant="contained">
              Generer
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProjectsGenerateSemesterDialog;
