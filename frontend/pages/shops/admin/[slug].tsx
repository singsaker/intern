import { useQuery } from "@apollo/client";
import Loading from "@components/Loading";
import { GET_SHOP } from "@graphql/shops/queries";
import DashboardLayout from "@layouts/dashboard";
import { Button, Card, Container, Grid, Stack, Typography } from "@mui/material";
import ShopCategoryTable from "@src/admin/shops/ShopCategoryTable";
import ShopChart from "@src/admin/shops/ShopChart";
import ShopProductTable from "@src/admin/shops/ShopProductTable";
import ShopSalesList from "@src/admin/shops/ShopSalesList";
import NextLink from "next/link";
import { useRouter } from "next/router";

const ShopAdministrationPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const { data: shopData, loading: shopLoading } = useQuery(GET_SHOP, {
    variables: { slug: slug }
  })

  if (shopLoading || !shopData) {
    return <Loading />
  }

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h3">{shopData.shop.name}</Typography>
        <NextLink href="/shops/front/[slug]" as={"/shops/front/" + slug} passHref>
          <Button variant="contained" color="warning">Gå til krysseside</Button>
        </NextLink>
      </Stack>
      <Grid container spacing={2}>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} lg={5}>
            <ShopChart sales={shopData.shop.sales} />
          </Grid>
          <Grid item xs={12} lg={7}>
            <ShopSalesList sales={shopData.shop.sales} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <ShopCategoryTable shop={shopData.shop} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <ShopProductTable shop={shopData.shop} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

ShopAdministrationPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout title="Shop administrasjon" back>
      {page}
    </DashboardLayout>
  )
}

export default ShopAdministrationPage;