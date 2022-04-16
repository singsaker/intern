import { Box, Button, Card, CardHeader, Stack, styled } from "@mui/material";

const MainCardStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    color: theme.palette.error.lighter,
    [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(1),
    },
    backgroundColor: theme.palette.error.dark
}));

const CurrentShiftModule = () => {
    return (
        <>
            <MainCardStyle>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <CardHeader title="Du sitter vakt" sx={{ ".MuiTypography-body2": { color: "error.lighter" } }} />
                    <Box mr={3} mt={2}>
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="warning">
                                Utsjekk
                            </Button>
                            <Button variant="contained" color="error">
                                Bytt
                            </Button>
                        </Stack>
                    </Box>

                </Stack>
            </MainCardStyle>
        </>
    )
}

export default CurrentShiftModule;