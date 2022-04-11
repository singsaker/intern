import { AppBar, Slide, styled, Tab, Tabs, useScrollTrigger } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const DRAWER_WIDTH = 280;


const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100],
  "& .MuiTab-root": {
    // color: theme.palette.grey[300],
  },
  "& .Mui-selected": {
    // color: theme.palette.secondary.light
  },
  "& .MuiTabs-indicator": {
    // backgroundColor: theme.palette.secondary.light
  },
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    marginLeft: DRAWER_WIDTH,
  },
}));

interface Props {
  children?: JSX.Element | JSX.Element[]
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
    <>
      <RootStyle position='sticky' sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab value={"/admin/rooms"} label="Romsjef" />
          <Tab value={"/admin/projects"} label="Regi" />
          <Tab value={"/admin/reception"} label="Vakter" />
          <Tab value={"/admin/rental"} label="Utleie" />
          <Tab value={"/admin/secretary"} label="Sekretær" />
        </Tabs>
      </RootStyle>
    </>
  )
}

interface HideOnScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


export default AdminLayout;