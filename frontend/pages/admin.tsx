import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import WorkModule from 'src/admin/projects/WorkModule';
import DashboardLayout from "src/layouts/dashboard";

const Admin = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DashboardLayout>
      <Box my={2}>
        <Typography variant="h2" sx={{ mb: 3 }}>Utvalget</Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              variant="scrollable"
              value={value}
              onChange={handleChange}
            >
              <Tab label="Romsjef" />
              <Tab label="Regisjef" />
              <Tab label="Sekretær" />
              <Tab label="Vaktsjef" />
              <Tab label="Kosesjef" />
              <Tab label="Husfar" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Romsjef
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WorkModule />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Sekretær
          </TabPanel>
          <TabPanel value={value} index={3}>
            Vaktsjef
          </TabPanel>
          <TabPanel value={value} index={4}>
            Kosesjef
          </TabPanel>
          <TabPanel value={value} index={5}>
            Husfar
          </TabPanel>
        </Box>
      </Box>
    </DashboardLayout>
  )
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Admin;

