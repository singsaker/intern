import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';


const RootStyle = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

const Loading = () => {
  return (
    <RootStyle>
      <CircularProgress />
    </RootStyle>
  )
}

export default Loading;