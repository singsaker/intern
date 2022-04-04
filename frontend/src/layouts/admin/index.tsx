import { AppBar, Box, styled, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: theme.palette.grey[100],
  "& .MuiTab-root": {
    // color: theme.palette.grey[300],
  },
  "& .Mui-selected": {
    // color: theme.palette.secondary.light
  },
  "& .MuiTabs-indicator": {
    // backgroundColor: theme.palette.secondary.light
  }
}));

interface Props {
  children: JSX.Element | JSX.Element[]
}

const AdminLayout = ({ children }: Props) => {
  const [value, setValue] = useState<string>("/admin/rooms");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue, undefined, { shallow: true })
  };

  useEffect(() => {
    setValue(router.pathname)
  }, [router])

  return (
    <Box mt={6} mb={8}>
      <Box sx={{ width: '100%', mb: 10 }}>
        <RootStyle sx={{ top: 64, border: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            value={value}
            onChange={handleChange}
          >
            <Tab value={"/admin/rooms"} label="Romsjef" />
            <Tab value={"/admin/projects"} label="Regisjef" />
            <Tab value={"/admin/reception"} label="Vaktsjef" />
          </Tabs>
        </RootStyle>
      </Box>
      {children}
    </Box>
  )
}


export default AdminLayout;