import LoginForm from "@components/authentication/login/LoginForm";
import Logo from "@components/Logo";
import { Container, Stack, styled, Typography } from "@mui/material";

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const LogInPage = () => {
  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Logo sx={{ mb: 2 }} />
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Logg inn
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Singsaker Studenterhjem internside.</Typography>
        </Stack>

        <LoginForm />
      </ContentStyle>
    </Container>
  )
}

export default LogInPage;