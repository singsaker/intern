import { Box, Button, Container, Drawer, Stack, styled, Typography } from "@mui/material";
import { MemberProps } from "@src/types/user";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
}));

interface Props {
    open: boolean;
    member?: MemberProps;
    handleCheckout: (member: MemberProps) => void
}

function SelectedMemberDrawer({ open, member, handleCheckout }: Props) {
    if (!member) {
        return <></>
    }

    return (
        <>
            <Drawer
                PaperProps={{ sx: { borderTop: "none", boxShadow: 16 } }}
                variant="persistent"
                anchor="bottom"
                open={open}
            >
                <Box
                    sx={{
                        bgcolor: "secondary.dark",
                        color: "common.white",
                        py: 3,
                        height: "110px",
                        overflow: "auto",
                    }}
                >
                    <Container>
                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                            <div>
                                <Typography variant="h5" gutterBottom>
                                    {member.firstName} {member.lastName}
                                </Typography>
                                <Typography color="secondary.main" variant="subtitle2">
                                    Her kommer en liste over ting som er krysset.
                                </Typography>
                            </div>
                            <Button size="large" variant="contained" color="secondary" onClick={() => handleCheckout(member)}>
                                Velg drikke
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </Drawer>
        </>
    );
}

export default SelectedMemberDrawer;