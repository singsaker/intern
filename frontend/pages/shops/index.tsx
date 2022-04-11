import { useAuthentication } from "@api/authentication";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_SALES, GET_SHOPS } from "@graphql/shops/queries";
import DashboardLayout from "@layouts/dashboard";
import { Box, Button, Card, CardHeader, Container, FormControl, Grid, Hidden, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, styled, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { SaleType } from "@src/types/sale";
import { ShopType } from "@src/types/shop";
import dateFormat from "dateformat";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const ShopsPage = () => {
  const { userDetails } = useAuthentication();

  const [shop, setShop] = useState<number>();

  // Håndter Select endringer
  const handleChange = (event: SelectChangeEvent<number>) => {
    setShop(event.target.value as number);
  };

  const [getSales, { data: salesData, loading: salesLoading }] = useLazyQuery(GET_SALES);
  const { data: shopsData, loading: shopsLoading } = useQuery(GET_SHOPS, {
    onCompleted: (data) => {
      getSales({ variables: { shop: data.allShops[0].id, member: userDetails?.member.id } })
    }
  });

  useEffect(() => {
    if (shopsData && shop) {
      getSales({ variables: { shop: shop, member: userDetails?.member.id } })
    }
  }, [shop, shopsData])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - salesData?.allSales?.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ padding: { xs: 2, lg: 3 }, bgcolor: "warning.lighter", color: "warning.darker" }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">Dine shops</Typography>
              {!shopsLoading && shopsData.allShops.map((shop: ShopType) => (
                <NextLink key={shop.id} passHref href="/shops/admin/[slug]" as={"/shops/admin/" + shop.slug}>
                  <Button fullWidth color="warning" variant="contained">{shop.name}</Button>
                </NextLink>
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader title="Din kryssing" subheader="Her finner du informasjon om din kryssing på Sing" />
            <Box sx={{ mx: 3 }}>
              {(!shopsLoading && shopsData) && (
                <FormControl sx={{ my: 2 }}>
                  <Select
                    defaultValue={shopsData.allShops[0].id}
                    value={shop}
                    label="Velg shop"
                    onChange={handleChange}
                    input={<OutlinedInput color="secondary" size="small" />}
                  >
                    {shopsData.allShops.map((shop: ShopType) => (
                      <MenuItem key={shop.id} value={shop.id}>{shop.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 0 }}>Tid</TableCell>
                      <TableCell>Antall</TableCell>
                      <TableCell>Drikke</TableCell>
                      <Hidden smDown>
                        <TableCell>Pris</TableCell>
                      </Hidden>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(!salesLoading && salesData) && salesData.allSales.map((sale: SaleType) => (
                      <TableRow key={sale.id}>
                        <TableCell sx={{ pl: 0 }}>{dateFormat(new Date(sale.date), "mm.dd.yy HH:mm")}</TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell>{sale.product.name}</TableCell>
                        <Hidden smDown>
                          <TableCell>{sale.price}</TableCell>
                        </Hidden>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={4}
                        count={salesData?.allSales?.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage="Rader:"
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

ShopsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout title="Kryssing">
      {page}
    </DashboardLayout>
  )
}

export default ShopsPage;