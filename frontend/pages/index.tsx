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
    <Layout>
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
    </Layout>
  )
}

export default function Home() {
  return (
    <div>
      <main>
        <SignIn />
      </main>
    </div>
  )
}