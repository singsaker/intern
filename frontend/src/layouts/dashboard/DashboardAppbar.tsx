import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useRouter } from "next/router";
import { House, Key, ShoppingCart, Timer, UserList } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Routes from "src/routes";


// ----------------------------------------------------------------------

export default function DashboardAppbar() {
  const router = useRouter();
  const [value, setValue] = useState<string>();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue == Routes.admin) {
      router.push(newValue + "/rooms", undefined, { shallow: true })
    } else {
      router.push(newValue, undefined, { shallow: true })
    }
  };

  useEffect(() => {
    const path = "/" + router.pathname.split("/")[1]

    setValue(path)
  }, [router])

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={20}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction value={Routes.home} label="Hjem" icon={<House weight="duotone" />} />
        <BottomNavigationAction value={Routes.work} label="Dugnad" icon={<Timer weight="duotone" />} />
        <BottomNavigationAction value={Routes.members} label="Beboere" icon={<UserList weight="duotone" />} />
        <BottomNavigationAction value={Routes.shops} label="Kryssing" icon={<ShoppingCart weight="duotone" />} />
        <BottomNavigationAction value={Routes.admin} label="Utvalget" icon={<Key weight="duotone" />} />
      </BottomNavigation>
    </Paper>
  );
}
