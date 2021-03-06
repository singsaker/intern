import { useAuthentication } from "@api/authentication";
import { Avatar, Box, Button, Divider, IconButton, MenuItem, Typography } from '@mui/material';
// material
import { alpha } from '@mui/material/styles';
import NextLink from "next/link";
//
import { House, User } from 'phosphor-react';
import { useRef, useState } from 'react';
// components
import MenuPopover from 'src/components/MenuPopover';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Hjem',
    icon: House,
    linkTo: '/',
  },
  {
    label: 'Profil',
    icon: User,
    linkTo: '/profile',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { signOut, userDetails } = useAuthentication();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 32,
          height: 32,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar sx={{ width: 32, height: 32 }} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {userDetails?.member.firstName || "Mangler navn"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <NextLink key={option.label} href={option.linkTo} passHref>
            <MenuItem
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              {option.label}
            </MenuItem>
          </NextLink>

        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={() => signOut()} fullWidth color="inherit" variant="outlined">
            Logg ut
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
