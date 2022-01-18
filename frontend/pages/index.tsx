import { useAuthentication } from '@api/authentication';
import Layout from '@components/Layout';
import React, { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuthentication()


  function onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()
    signIn({ username, password })
  }

  return (
    <>
      <h1>Logg inn</h1>
      <form noValidate onSubmit={onSubmit} style={{ width: 300 }}>
        <input
          required
          id="username"
          name="username"
          autoComplete="username"
          style={{ width: "100%", marginBottom: 10 }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          required
          name="password"
          id="password"
          style={{ width: "100%", marginBottom: 10 }}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          style={{ width: "100%" }}
          type="submit"
        >
          Sign In
        </button>
        <br />
      </form>
    </>
  )
}

export default function Home() {
  const { useData } = useAuthentication()
  const { username } = useData();

  return (
    <Layout>
      <main>
        {username ? <h1>Du er allerede logget inn!!</h1> : <SignIn />}
      </main>
    </Layout>
  )
}