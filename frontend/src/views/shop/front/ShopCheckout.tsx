import { useMutation } from "@apollo/client";
import { CREATE_SALE } from "@graphql/shops/mutations";
import { GET_SHOP } from "@graphql/shops/queries";
import {
    Box,
    Button,
    Card, CardActionArea, Checkbox, Chip, Container, Divider, FormControlLabel, FormGroup, Grid, IconButton, List,
    ListItem, Paper, Radio, Slider, Stack, Tooltip,
    Typography
} from "@mui/material";
import { alpha, useTheme } from "@mui/system";
import { ShopType } from "@src/types/shop";
import { MemberProps } from "@src/types/user";
import { ArrowLeft, X } from "phosphor-react";
import { SetStateAction, useReducer, useState } from "react";

// =================================
// DENNE KOMPONENTEN BØR SKRIVES OM
// GANSKE DÅRLIG SKREVET OG ROTETE!
// =================================

function useObjectReducer() {
    const [state, dispatch] = useReducer(reducer, {});

    function reducer(state: any, newFieldsVal: any) {
        return { ...state, ...newFieldsVal };
    }

    return [
        state,
        (newFieldsVal: string | number, newVal: any) => {
            if (typeof newVal !== "undefined") {
                const tmp: any = {};
                tmp[newFieldsVal] = newVal;
                dispatch(tmp);
            } else {
                dispatch(newFieldsVal);
            }
        },
    ];
}

interface Props {
    shop: ShopType
    member: MemberProps
    handleClose: () => void
}

const ShopCheckout = ({ shop, member, handleClose }: Props) => {
    const theme = useTheme();
    const [valg, setValg] = useState("Pant");
    const [amount, setAmount] = useState(1);
    const [state, updateState] = useObjectReducer();
    const [removeCheck, setRemoveCheck] = useState(false);
    const [pantCheck, setPantCheck] = useState(false);

    const handleChange = (nyttValg: SetStateAction<string> | null) => {
        if (nyttValg !== null) {
            setValg(nyttValg);
        }
    };

    const handleAmountChange = (event: Event, newValue: number | number[]) => {
        setAmount(newValue as number);
    };

    const activeRootStyle = {
        color: "secondary.main",
        fontWeight: "fontWeightMedium",
        bgcolor: alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity),
        "&:before": { display: "block" },
    };

    const rootStyle = {
        bgcolor: "grey.200",
    };

    const [createSale] = useMutation(CREATE_SALE, { refetchQueries: [GET_SHOP] })

    return (
        <>
            <Container sx={{ py: 10 }}>
                <Box mb={3}>
                    <Button onClick={handleClose} color="inherit" variant="outlined" startIcon={<ArrowLeft />}>
                        Gå tilbake
                    </Button>
                </Box>
                <Typography variant="h4">Kryssing for {member.firstName} {member.lastName}</Typography>
                <Card sx={{ p: 2, mt: 5 }}>
                    <Grid container spacing={3}>
                        <Grid xs item sx={{ m: 2, mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ mb: 3 }}>
                                Velg vare
                            </Typography>
                            <Grid container spacing={2}>
                                {shop.products && shop.products.map((d) => (
                                    <Grid key={d.id} item xs={4}>
                                        <Tooltip
                                            title={d.description || ""}
                                        >
                                            <Card
                                                sx={{
                                                    ...(d.name == valg ? activeRootStyle : rootStyle),
                                                }}
                                            >
                                                <CardActionArea onClick={() => handleChange(d.name)}>
                                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 2 }}>
                                                        <Box
                                                            sx={{ width: 1 / 3, height: 80, objectFit: "cover" }}
                                                            component="img"
                                                            alt="profile"
                                                            src={"https://picsum.photos/seed/" + d.id + "/200/300"}
                                                        />
                                                        <Box
                                                            py={2}
                                                            pr={2}
                                                            display="flex"
                                                            alignItems="center"
                                                            flexGrow="1"
                                                            justifyContent="space-between"
                                                        >
                                                            <Typography variant="subtitle2">{d.name}</Typography>
                                                            <Radio checked={d.name == valg} color="secondary" />
                                                        </Box>
                                                    </Stack>
                                                </CardActionArea>
                                            </Card>
                                        </Tooltip>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ my: 3 }}>
                                <Grid container alignItems="end" spacing={3}>
                                    <Grid item xs sx={{ mt: 1 }}>
                                        <Slider
                                            aria-label="Antall"
                                            color={removeCheck ? "primary" : "secondary"}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            min={0}
                                            max={12}
                                            value={amount}
                                            marks
                                            onChange={handleAmountChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Grid alignItems="end" container spacing={1}>
                                            <Grid item>
                                                <Typography variant="h2" sx={{ minWidth: 50, textAlign: "right" }}>
                                                    {(removeCheck && amount != 0 ? "-" : "") + amount}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" sx={{ mb: "11px", color: "grey.500" }}>
                                                    {valg}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <FormGroup row sx={{ mb: 2 }}>
                                <FormControlLabel
                                    disabled={valg == "Pant" || removeCheck}
                                    checked={pantCheck && valg != "Pant" && !removeCheck}
                                    onChange={() => setPantCheck(!pantCheck)}
                                    control={<Checkbox />}
                                    label="Jeg panter ikke hjemme"
                                />
                                <FormControlLabel
                                    checked={removeCheck}
                                    onChange={() => setRemoveCheck(!removeCheck)}
                                    control={<Checkbox color="error" />}
                                    label="Korriger kryss"
                                />
                            </FormGroup>
                            {shop?.products && (
                                <Button
                                    onClick={() => {
                                        updateState({
                                            [valg]: {
                                                quantity: removeCheck ? -amount : amount,
                                                price: shop.products?.find((el) => el.name == valg)?.price,
                                                id: shop.products?.find((el) => el.name == valg)?.id,
                                            },
                                        });
                                        pantCheck &&
                                            updateState({
                                                Pant: {
                                                    quantity: amount,
                                                    price: shop.products?.find((el) => el.name == "Pant")?.price,
                                                    id: shop.products?.find((el) => el.name == "Pant")?.id,
                                                },
                                            });
                                        setAmount(1);
                                    }}

                                    variant="outlined"
                                    fullWidth
                                    color="inherit"
                                    size="large"
                                >
                                    Oppdater
                                </Button>
                            )}
                        </Grid>
                        <Grid xs={4} item>
                            <Paper sx={{ p: 3, bgcolor: "grey.100", height: "100%", display: "flex", flexDirection: "column" }}>
                                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                                    Oppsummering
                                </Typography>
                                <List sx={{ mb: 1, flexGrow: 1 }}>
                                    {state != null ? (
                                        Object.entries(state).map((item, id) =>
                                            item[1] != null && (
                                                <ListItem
                                                    key={id}
                                                    disableGutters
                                                    secondaryAction={
                                                        <IconButton
                                                            onClick={() => updateState({ [item[0]]: undefined })}
                                                            edge="end"
                                                            aria-label="comments"
                                                        >
                                                            <X />
                                                        </IconButton>
                                                    }
                                                >
                                                    <Grid container justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                                                                {(item as any)[1].quantity}x {item[0]}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Chip label={(item as any)[1].price + " kr"} size="small" />
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            )
                                        )
                                    ) : (
                                        <ListItem disableGutters>
                                            <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                                                Du har ikke valgt en vare enda.
                                            </Typography>
                                        </ListItem>
                                    )}
                                </List>
                                <Divider />
                                <Box sx={{ py: 3 }}>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h6">Total</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">
                                                {state != null
                                                    ? Object.entries(state)
                                                        .map((a) => a[1] != null && (a as any)[1].price * (a as any)[1].quantity)
                                                        .reduce((a, b) => parseInt(a + "") + parseInt(b + ""), 0) + " Kr"
                                                    : "0 Kr"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Button
                                    onClick={() => {
                                        Object.entries(state).map((item) => {
                                            if (item[1] != undefined) {
                                                createSale({
                                                    variables: { member: member.id, shop: shop.id, quantity: (item as any)[1].quantity, product: (item as any)[1].id },
                                                });
                                            }
                                        });
                                        handleClose();
                                    }}
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                >
                                    Kryss
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
};

export default ShopCheckout;