import { Box, Card, CardHeader, Hidden, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material"
import { SaleType } from "@src/types/sale"
import dateFormat from "dateformat"
import { useState } from "react"

interface Props {
    sales: SaleType[]
}

const ShopSalesList = ({ sales }: Props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sales.length) : 0;

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
        <Card>
            <CardHeader title="Kryssing" subheader="Siste transaksjoner" />
            <Box sx={{ mx: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 0 }}>Tid</TableCell>
                                <TableCell>Antall</TableCell>
                                <TableCell>Drikke</TableCell>
                                <Hidden smDown>
                                    <TableCell>Beboer</TableCell>
                                </Hidden>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sale: SaleType) => (
                                <TableRow key={sale.id}>
                                    <TableCell sx={{ pl: 0 }}>{dateFormat(new Date(sale.date), "mm.dd.yy HH:mm")}</TableCell>
                                    <TableCell>{sale.quantity}</TableCell>
                                    <TableCell>{sale.product.name}</TableCell>
                                    <Hidden smDown>
                                        <TableCell>{sale.member.firstName} {sale.member.lastName}</TableCell>
                                    </Hidden>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (58) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={sales.length}
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
    )
}

export default ShopSalesList