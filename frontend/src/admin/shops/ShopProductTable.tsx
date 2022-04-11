import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "@graphql/shops/mutations";
import { GET_SHOP } from "@graphql/shops/queries";
import { AppBar, Box, Button, CardHeader, Chip, Dialog, DialogActions, FormControl, IconButton, InputBase, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRenderCellParams, GridRenderEditCellParams, GridRowParams, GridRowsProp, GridValueSetterParams, useGridApiContext } from "@mui/x-data-grid";
import { ProductCategoryType } from "@src/types/product";
import { ShopType } from "@src/types/shop";
import shape from "@theme/shape";
import { TrashSimple, X } from "phosphor-react";
import { Key, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
    shop: ShopType
}

const ShopProductTable = ({ shop }: Props) => {
    const [open, setOpen] = useState(false)
    const [updateProduct] = useMutation(UPDATE_PRODUCT)
    const [deleteProduct] = useMutation(DELETE_PRODUCT, { refetchQueries: [GET_SHOP] })

    const setProduct = (params: GridValueSetterParams, key: string) => {
        updateProduct({
            variables: {
                id: params.row.id,
                ...(key == "productCategories" && { productCategories: params.value.map((v: ProductCategoryType) => v.id) }),
                productData: {
                    name: key == "name" ? params.value : params.row.name,
                    description: key == "description" ? params.value : params.row.description,
                    quantity: key == "quantity" ? params.value : params.row.quantity,
                    price: key == "price" ? params.value : params.row.price,
                }
            }
        })

        return { ...params.row, total: params.value };
    }

    const rows: GridRowsProp = shop?.products?.map(item => {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productCategories: item.productCategories,
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
            valueSetter: (params: GridValueSetterParams<any, any>) => setProduct(params, "name"),
        },
        {
            field: 'description',
            headerName: 'Beskrivelse',
            minWidth: 120,
            flex: 1,
            editable: true,
            valueSetter: (params: GridValueSetterParams<any, any>) => setProduct(params, "description"),
        },
        {
            field: 'price',
            headerName: 'Pris',
            minWidth: 120,
            flex: 1,
            editable: true,
            valueSetter: (params: GridValueSetterParams<any, any>) => setProduct(params, "price"),
        },
        {
            field: 'quantity',
            headerName: 'Antall',
            minWidth: 120,
            flex: 1,
            editable: true,
            valueSetter: (params: GridValueSetterParams<any, any>) => setProduct(params, "quantity"),
        },
        {
            field: 'productCategories',
            headerName: 'Kategori',
            minWidth: 120,
            flex: 1,
            editable: true,
            valueSetter: (params: GridValueSetterParams<any, any>) => setProduct(params, "productCategories"),
            renderEditCell: (params: GridRenderEditCellParams) => {
                return (
                    <CategoryEditInputCell shop={shop} {...params} />
                );
            },
            renderCell: (params: GridRenderCellParams<any>) => (
                <Stack spacing={0.5} direction="row">
                    {params.row.productCategories.map((productCategory: ProductCategoryType) => (
                        <Chip key={productCategory.id} label={productCategory.name} size="small" color="primary" />
                    ))}
                </Stack>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem icon={<TrashSimple />} onClick={() => deleteProduct({ variables: { id: params.row.id } })} label="Delete" />,
            ]
        }
    ];

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <CardHeader title="Produkter" />
                <Button variant="outlined" color="inherit" onClick={() => setOpen(true)} sx={{ mr: 3, mt: 1.5 }}>Nytt produkt</Button>
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
            <ProductProductDialog open={open} handleClose={() => setOpen(false)} shop={shop} />
        </>
    )
}

interface CategoryEditInputCellProps extends GridRenderCellParams<number> {
    shop: ShopType
}

function CategoryEditInputCell(props: CategoryEditInputCellProps) {
    const { id, row, field, shop } = props;
    const value: ProductCategoryType[] = row.productCategories
    const apiRef = useGridApiContext();
    const [productCategory, setProductCategory] = useState<number[]>(value.map(productCategory => productCategory.id));

    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const {
            target: { value },
        } = event;
        setProductCategory(
            event.target.value as number[]
        );
    };

    useEffect(() => {
        apiRef.current.setEditCellValue({ id, field, value: shop.productCategories.filter((c) => productCategory.includes(c.id)) });

    }, [productCategory])

    return (
        <Select
            fullWidth
            multiple
            value={productCategory}
            onChange={handleChange}
            input={<InputBase />}
            MenuProps={MenuProps}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip
                            key={value}
                            label={shop.productCategories.find(productCategory => productCategory.id == value)?.name}
                            size="small"
                            color="primary" />
                    ))}
                </Box>
            )}
        >
            {shop.productCategories.map((productCategory) => (
                <MenuItem
                    key={productCategory.id}
                    value={productCategory.id as number}
                >
                    {productCategory.name}
                </MenuItem>
            ))}
        </Select>
    );
}

export interface DialogProps {
    open: boolean;
    handleClose: () => void;
    shop: ShopType;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ProductProductDialog = (props: DialogProps) => {
    const { open, handleClose, shop } = props;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();


    const [createProduct] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [GET_SHOP]
    });

    const onSubmit = (data: any) => {
        createProduct({
            variables: {
                shop: shop.id,
                productCategories: data.productCategories,
                productData: {
                    name: data.name,
                    description: data.description,
                    price: parseFloat(data.price),
                    quantity: data.quantity ? data.quantity : undefined,
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
            PaperProps={{ sx: { overflow: "visible" } }}
        >
            <AppBar color="inherit" elevation={0} variant="outlined"
                sx={{ position: 'relative', borderTopLeftRadius: shape.borderRadiusSm, borderTopRightRadius: shape.borderRadiusSm }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <X size="24px" />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Nytt produkt
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
                            error={!!errors.description}
                            placeholder="Beskrivelse"
                            label="Beskrivelse"
                            fullWidth
                            variant="standard"
                            size="small"
                            {...register('description')}
                        />
                        <TextField
                            error={!!errors.price}
                            placeholder="Pris"
                            label="Pris"
                            fullWidth
                            variant="standard"
                            size="small"
                            {...register('price', { required: true })}
                        />
                        <TextField
                            error={!!errors.quantity}
                            placeholder="Antall"
                            label="Antall"
                            fullWidth
                            variant="standard"
                            size="small"
                            {...register('quantity')}
                        />
                        <Controller
                            name="productCategories"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormControl>
                                    <InputLabel id="demo-multiple-name-label">Kategorier</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={value || []}
                                        onChange={onChange}
                                        input={<OutlinedInput label="Kategorier" />}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value: Key | null | undefined) => (
                                                    <Chip key={value} label={shop.productCategories.find(productCategory => productCategory.id == value)?.name} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {shop.productCategories.map((productCategory) => (
                                            <MenuItem
                                                key={productCategory.id}
                                                value={productCategory.id}
                                            >
                                                {productCategory.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <DialogActions>
                            <Button type="submit" fullWidth color="secondary" variant="contained">
                                Legg til
                            </Button>
                        </DialogActions>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ShopProductTable