import { useQuery } from "@apollo/client";
import { GET_MEMBERS } from "@graphql/members/queries";
import { Card, CardHeader, Chip, Hidden, Stack, TablePagination, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { MemberProps } from "@src/types/user";
import React, { useState } from "react";
import MembersListToolbar from "./MembersListToolbar";

function applySortFilter(array: Array<MemberProps>, query?: string) {
  if (query) {
    return array.filter(
      (array: MemberProps) => (array.firstName + " " + array.lastName)
        .toLowerCase()
        .indexOf(query.toLowerCase()) !== -1
    );
  } else {
    return array
  }
}

const MembersList = (props: any) => {
  const [page, setPage] = useState(0);
  const { data: membersData, loading } = useQuery(GET_MEMBERS);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filterName, setFilterName] = useState("");


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilterName(event.target.value);
  };

  if (loading || membersData.length < 1) return <div>Loading</div>;

  const filteredUsers = applySortFilter(membersData.allMembers, filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - membersData.allMembers.length) : 0;

  return (
    <Card>
      <CardHeader title="Aktive beboere" />
      <MembersListToolbar filterName={filterName} onFilterName={handleFilterByName} />
      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 1 }}>Navn</TableCell>
              <TableCell align="right" sx={{ pr: 2 }}>Rom</TableCell>
              <Hidden smDown>
                <TableCell >Epost</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell>Studie</TableCell>
                <TableCell>Universitet</TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

              return (
                <TableRow
                  style={{ cursor: "pointer" }}
                  onClick={() => props.toggleBeboer(row.id)}
                  hover
                  key={row.id}
                  tabIndex={-1}
                >
                  <TableCell sx={{ pl: 1 }} component="th" scope="row">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar variant="circular" sx={{ height: 30, width: 30 }} />
                      <Typography variant="body2" noWrap>
                        {row.firstName} {row.lastName}
                      </Typography>

                    </Stack>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Chip variant="outlined" label={273} />
                  </TableCell>
                  <Hidden smDown>
                    <TableCell align="left">{row.user?.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">study</TableCell>
                    <TableCell align="left">school</TableCell>
                  </Hidden>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {isUserNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  Ingen resultat
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <TablePagination
          component="div"
          count={membersData.allMembers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage={isMobile ? "" : "Rader per side:"}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  );
};

export default MembersList;