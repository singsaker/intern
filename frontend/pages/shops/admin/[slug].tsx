import { useQuery } from "@apollo/client";
import Loading from "@components/Loading";
import { GET_SHOP } from "@graphql/shops/queries";
import DashboardLayout from "@layouts/dashboard";
import { Button, Container, Stack, Typography } from "@mui/material";
import ShopCategoryTable from "@src/admin/shops/ShopCategoryTable";
import ShopProductTable from "@src/admin/shops/ShopProductTable";
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
          <Button variant="outlined" color="inherit">Gå til krysseside</Button>
        </NextLink>
      </Stack>
      <ShopCategoryTable shop={shopData.shop} />
      <ShopProductTable shop={shopData.shop} />
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