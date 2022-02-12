import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useRouter } from "next/router";
import { House, Key, Timer, UserList, UserSquare } from 'phosphor-react';
import Routes from "src/routes";

// ----------------------------------------------------------------------

export default function DashboardAppbar() {
  const router = useRouter();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={router.pathname}
      >
        <BottomNavigationAction onClick={() => router.push(Routes.home)} value={Routes.home} label="Hjem" icon={<House weight="duotone" />} />
        <BottomNavigationAction onClick={() => router.push(Routes.work)} value={Routes.work} label="Arbeid" icon={<Timer weight="duotone" />} />
        <BottomNavigationAction label="Beboere" icon={<UserList weight="duotone" />} />
        <BottomNavigationAction label="Meg" icon={<UserSquare weight="duotone" />} />
        <BottomNavigationAction onClick={() => router.push(Routes.admin)} value={Routes.admin} label="Utvalget" icon={<Key weight="duotone" />} />
      </BottomNavigation>
    </Paper>
  );
}
