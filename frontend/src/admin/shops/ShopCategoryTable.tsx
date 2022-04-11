import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, UPDATE_PRODUCT_CATEGORY } from "@graphql/shops/mutations";
import { GET_SHOP } from "@graphql/shops/queries";
import { AppBar, Box, Button, CardHeader, Dialog, DialogActions, Divider, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowParams, GridRowsProp, GridValueSetterParams } from "@mui/x-data-grid";
import { ShopType } from "@src/types/shop";
import shape from "@theme/shape";
import { TrashSimple, X } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
    shop: ShopType
}

const ShopCategoryTable = ({ shop }: Props) => {
    const [open, setOpen] = useState(false)
    const [updateProductCategory] = useMutation(UPDATE_PRODUCT_CATEGORY)
    const [deleteProductCategory] = useMutation(DELETE_PRODUCT_CATEGORY, { refetchQueries: [GET_SHOP] })

    const setProductCategory = (params: GridValueSetterParams, key: string) => {
        updateProductCategory({
            variables: {
                id: params.row.id,
                name: key == "name" ? params.value : params.row.name,
                description: key == "description" ? params.value : params.row.description,
            }
        })

        return { ...params.row, total: params.value };
    }

    const rows: GridRowsProp = shop?.productCategories?.map(item => {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
        }
    }) || [{ id: 0, name: "", description: "" }]

    const columns = [
        {
            field: 'name',
            headerName: 'Navn',
            minWidth: 120,
            flex: 1,
            editable: true,
            valueSetter: (params: GridValueSetterParams<any, any>) => setProductCategory(params, "name"),
        },
        {
            field: 'description',
            headerName: 'Beskrivelse',
            minWidth: 120,
            flex: 1,
            editable: true,
            valueSetter: (params: GridValueSetterParams<any, any>) => setProductCategory(params, "description"),
        },
        {
            field: 'actions',
            type: 'actions',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem icon={<TrashSimple />} onClick={() => deleteProductCategory({ variables: { id: params.row.id } })} label="Delete" />,
            ]
        }
    ];

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <CardHeader title="Kategorier" />
                <Button variant="outlined" color="inherit" onClick={() => setOpen(true)} sx={{ mr: 3, mt: 1.5 }}>Ny kategori</Button>
            </Stack>
            <Box mx={2}>
                {(rows.length != 0) && (
                    <DataGrid
                        sx={{ borderRadius: 0, borderLeft: "none", borderRight: "none" }}
                        rows={rows}
                        columns={columns}
                        autoHeight
                        rowsPerPageOptions={[15, 50]}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'name', sort: 'asc' }],
                            },
                        }}
                    />
                )}
            </Box>
            <ProductCategoryDialog open={open} handleClose={() => setOpen(false)} shop={shop} />
        </>
    )
}

export interface DialogProps {
    open: boolean;
    handleClose: () => void;
    shop: ShopType;
}


const ProductCategoryDialog = (props: DialogProps) => {
    const { open, handleClose, shop } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const [createProductCategory] = useMutation(CREATE_PRODUCT_CATEGORY, {
        refetchQueries: [GET_SHOP]
    });

    const onSubmit = (data: any) => {
        createProductCategory({
            variables: {
                shop: shop.id,
                name: data.name,
                description: data.description
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
                        Ny kategori
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
                        <TextField
                            error={!!errors.name}
                            placeholder="Navn"
                            label="Navn"
                            fullWidth
                            variant="standard"
                            size="small"
                            {...register('name', { required: true })}
                        />
                        <TextField
                            error={!!errors.name}
                            placeholder="Beskrivelse"
                            label="Beskrivelse"
                            fullWidth
                            variant="standard"
                            size="small"
                            {...register('description')}
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
    )
}

export default ShopCategoryTable