import { Box, InputAdornment, OutlinedInput, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MagnifyingGlass } from "phosphor-react";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 56,
  display: "flex",
  justifyContent: "space-between",
  padding: 0,
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props {
  filterName: string;
  onFilterName: any;
}

const MembersListToolbar = ({ filterName, onFilterName }: Props) => {
  return (
    <Box mx={2} mt={1}>
      <RootStyle>
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Søk etter beboer..."
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlass />
            </InputAdornment>
          }
        />
      </RootStyle>
    </Box>
  );
};

export default MembersListToolbar;