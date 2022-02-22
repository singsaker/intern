import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useRouter } from "next/router";
import { House, Key, ShoppingCart, Timer, UserList } from 'phosphor-react';
import Routes from "src/routes";

// ----------------------------------------------------------------------

export default function DashboardAppbar() {
  const router = useRouter();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={20}>
      <BottomNavigation
        value={router.pathname}
      >
        <BottomNavigationAction onClick={() => router.push(Routes.home)} value={Routes.home} label="Hjem" icon={<House weight="duotone" />} />
        <BottomNavigationAction onClick={() => router.push(Routes.work)} value={Routes.work} label="Arbeid" icon={<Timer weight="duotone" />} />
        <BottomNavigationAction onClick={() => router.push(Routes.members)} value={Routes.members} label="Beboere" icon={<UserList weight="duotone" />} />
        <BottomNavigationAction onClick={() => router.push(Routes.shops)} value={Routes.shops} label="Kryssing" icon={<ShoppingCart weight="duotone" />} />
        <BottomNavigationAction onClick={() => router.push(Routes.admin)} value={Routes.admin} label="Utvalget" icon={<Key weight="duotone" />} />
      </BottomNavigation>
    </Paper>
  );
}
