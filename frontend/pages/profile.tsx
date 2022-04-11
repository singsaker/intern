import { useAuthentication } from "@api/authentication";
import Loading from "@components/Loading";
import DashboardLayout from "@layouts/dashboard";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";


const ProfilePage = () => {
    const { userDetails } = useAuthentication();

    if (!userDetails) {
        return <Loading />
    }

    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 2 }}>Beboer</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Generelt" />
                    <Tab label="Kryssing" />
                    <Tab label="Varsler" />
                </Tabs>
            </Box>
            <div
                role="tabpanel"
                hidden={tab !== 0}
            >
                {tab === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Typography>Test</Typography>
                    </Box>
                )}
            </div>
            <div
                role="tabpanel"
                hidden={tab !== 1}
            >
                {tab === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography>Test</Typography>
                    </Box>
                )}
            </div>
            <div
                role="tabpanel"
                hidden={tab !== 2}
            >
                {tab === 2 && (
                    <Box sx={{ p: 3 }}>
                        <Typography>Test</Typography>
                    </Box>
                )}
            </div>
        </Container>
    )
}

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export default ProfilePage