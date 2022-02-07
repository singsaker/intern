// material
import { useAuthentication } from '@api/authentication';
import {
  Box,
  Button, Stack, TextField
} from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, error } = useAuthentication()

  function onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()
    signIn({ username, password })
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="username"
          type="username"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </Box >
  );
}