import { useQuery } from "@apollo/client";
import { GET_MEMBERS } from "@graphql/members/queries";
import { GET_SHOP } from "@graphql/shops/queries";
import { alpha, Box, Card, CardActionArea, Chip, Container, Divider, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { MemberProps } from "@src/types/user";
import SelectedMemberDrawer from "@src/views/shop/front/SelectedMemberDrawer";
import { useRouter } from "next/router";
import { useState } from "react";


const ShopFrontPage = () => {
    const router = useRouter()
    const { slug } = router.query
    const [selectedMember, setSelectedMember] = useState<MemberProps | undefined>();
    const theme = useTheme();
    const [alignment, setAlignment] = useState<string | undefined>();
    const [open, setOpen] = useState(false);

    const { data: shopData, loading: shopLoading } = useQuery(GET_SHOP, {
        variables: { slug: slug }
    })

    const { data: memberData } = useQuery(GET_MEMBERS)

    const beboere: MemberProps[] = memberData?.allMembers.filter((a: MemberProps) => a.firstName);

    const handleSortChange = (_event: any, newValue?: string) => {
        setAlignment(newValue);
        setSelectedMember(undefined);
    };

    const activeRootStyle = {
        color: "secondary.main",
        fontWeight: "fontWeightMedium",
        bgcolor: alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity),
        "&:before": { display: "block" },
    };

    const onCardClick = (member: MemberProps) => {
        setSelectedMember(member)
        setOpen((member.id === selectedMember?.id && open !== false) ? false : true)
    }

    if (!beboere) {
        return <></>
    }

    return (
        <>
            <Container>
                <Typography variant="h2">Krysseside for {shopData?.shop.name}</Typography>
                <Grid container spacing={5}>
                    <Grid item xs>
                        <Box py={4}>
                            <ToggleButtonGroup color="standard" value={alignment} exclusive onChange={handleSortChange}>
                                {[...new Set(beboere.map((m) => m.firstName && m.firstName[0]))]
                                    .sort()
                                    .map((letter, i) => (
                                        letter && (
                                            <ToggleButton key={i} value={letter}>
                                                {letter as string}
                                            </ToggleButton>
                                        )
                                    ))}
                            </ToggleButtonGroup>
                        </Box>
                        <Grid container spacing={3}>
                            {beboere
                                .filter((m) => (!alignment ? 1 : m.firstName && m.firstName[0] == alignment))
                                .sort((a: MemberProps, b: MemberProps) => b.firstName && a.firstName?.localeCompare(b.firstName) || 1)
                                .map((member) => {
                                    const { id, firstName, lastName } = member;

                                    return (
                                        <Grid item xs={3} key={id}>
                                            <Card
                                                sx={{ ...(selectedMember?.id == id && activeRootStyle) }}
                                            >
                                                <CardActionArea
                                                    onClick={() => onCardClick(member)}
                                                >
                                                    <Stack position="relative" direction="row" spacing={2}>
                                                        <Box
                                                            sx={{ width: 1 / 3, height: "maxContent", objectFit: "cover" }}
                                                            component="img"
                                                            alt="profile"
                                                            src={"https://i.pravatar.cc/150?u=" + id}
                                                        />
                                                        <Box py={2} pr={2}>
                                                            <Typography variant="subtitle2" gutterBottom>
                                                                {firstName} {lastName}
                                                            </Typography>
                                                            <Chip label={"#" + 122} size="small" />
                                                        </Box>
                                                    </Stack>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </Grid>
                    <Divider sx={{ ml: 4 }} orientation="vertical" flexItem />
                    <Grid item xs={3}>
                        <Box py={4}>
                            <Typography variant="h4" gutterBottom>
                                Nylige kryss
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <SelectedMemberDrawer open={open} member={selectedMember} />
        </>
    )
}


export default ShopFrontPage;