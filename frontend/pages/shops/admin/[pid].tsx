import { useQuery } from "@apollo/client";
import { GET_SHOP } from "@graphql/shops/queries";
import DashboardLayout from "@layouts/dashboard";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { DotsThreeVertical, Plus } from "phosphor-react";


const ShopAdministration = () => {
  const router = useRouter()
  const { pid } = router.query

  const { data: shopData, loading: shopLoading } = useQuery(GET_SHOP, {
    variables: { id: pid }
  })

  return (
    <DashboardLayout>
      <Typography variant="h2" sx={{ mb: 3 }}>Shops: {shopData?.shop.name}</Typography>
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
    </DashboardLayout>
  )
}

export default ShopAdministration;