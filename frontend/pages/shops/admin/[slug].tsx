import { useQuery } from "@apollo/client";
import { GET_SHOP } from "@graphql/shops/queries";
import DashboardLayout from "@layouts/dashboard";
import { Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { DotsThreeVertical, Plus } from "phosphor-react";


const ShopAdministrationPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const { data: shopData, loading: shopLoading } = useQuery(GET_SHOP, {
    variables: { slug: slug }
  })

  return (
    <Container>
      <Typography variant="h2" sx={{ mb: 3 }}>Administrer {shopData?.shop.name}</Typography>
      <Typography variant="h4" sx={{ my: 3 }}>Kategorier</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              Navn
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <Plus size="20" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Øl
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <DotsThreeVertical />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Sukker
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <DotsThreeVertical />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant="h4" sx={{ my: 3 }}>Produkter</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              Navn
            </TableCell>
            <TableCell>
              Pris
            </TableCell>
            <TableCell>
              Kategori
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <Plus size="20" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Hansa Pils
            </TableCell>
            <TableCell>
              20
            </TableCell>
            <TableCell>
              Øl
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <DotsThreeVertical />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Cider
            </TableCell>
            <TableCell>
              24
            </TableCell>
            <TableCell>
              Sukker
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <DotsThreeVertical />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant="h4" sx={{ my: 3 }}>Statistikk</Typography>
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