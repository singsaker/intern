import { useQuery } from "@apollo/client";
import { GET_SHOPS } from "@graphql/shops/queries";
import DashboardLayout from "@layouts/dashboard";
import { Button, FormControl, MenuItem, Paper, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { ShopType } from "@src/types/shop";
import NextLink from "next/link";
import { useState } from "react";

const Shops = () => {
  const [shop, setShop] = useState(0);


  // Håndter Select endringer
  const handleChange = (event: SelectChangeEvent<number>) => {
    setShop(event.target.value as number);
  };

  const { data: shopsData, loading: shopsLoading } = useQuery(GET_SHOPS);

  return (
    <DashboardLayout>
      <Typography variant="h2" sx={{ mb: 3 }}>Shops</Typography>
      <Paper elevation={18} sx={{ padding: 2, mb: 4, bgcolor: "info.main", color: "common.white" }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Dine shops</Typography>
          {!shopsLoading && shopsData.allShops.map((shop: ShopType) => (
            <NextLink key={shop.id} passHref href={"/shops/admin/" + shop.id}>
              <Button fullWidth color="secondary" variant="contained">{shop.name}</Button>
            </NextLink>
          ))}
        </Stack>
      </Paper>
      <Typography variant="h3" gutterBottom>Din kryssing</Typography>
      <Typography paragraph>Her finner du informasjon om din kryssing på Sing.</Typography>
      <>
        {(!shopsLoading) && (
          <FormControl variant="standard" fullWidth size="small">
            <Select
              defaultValue={shopsData.allShops[0].id}
              value={shop}
              label="Velg prosjekt"
              onChange={handleChange}
            >
              {shopsData.allShops.map((shop: ShopType) => (
                <MenuItem key={shop.id} value={shop.id}>{shop.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </>
      <Typography variant="h4" sx={{ my: 3 }}>Dine transaksjoner</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tid</TableCell>
            <TableCell>Antall</TableCell>
            <TableCell>Drikke</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>02 / 11 / 22</TableCell>
            <TableCell>1</TableCell>
            <TableCell>Favoritt</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>02 / 11 / 22</TableCell>
            <TableCell>1</TableCell>
            <TableCell>Fancy</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant="h4" sx={{ my: 3 }}>Konsum</Typography>
      <Typography variant="h4" sx={{ my: 3 }}>Statistikk</Typography>
    </DashboardLayout>
  )
}

export default Shops;