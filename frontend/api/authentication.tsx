import { client } from "@api/apolloClient";
import { useQuery } from "@apollo/client";
import { AUTHENTICATE, DELETE_TOKEN_COOKIE } from "@graphql/members/mutations";
import { GET_USER } from "@graphql/members/queries";
import Router from "next/router";
import { createContext, useContext } from "react";

const AuthContext = createContext<any>({});

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface UserProps {
  username: string;
  password: string;
}

export function AuthProvider({ children }: Props) {
  const useData = () => {
    const { loading, error, data } = useQuery(GET_USER)

    if (!error && !loading) {
      return { ...data.userDetails }
    } else {
      return {}
    }
  }

  const signIn = async ({ username, password }: UserProps) => {
    await client.mutate({
      mutation: AUTHENTICATE,
      variables: { username, password },
    }).then(() => Router.push("/dashboard"))
  };

  const signOut = async () => {
    await client.mutate({
      mutation: DELETE_TOKEN_COOKIE,
    }).then(() => Router.reload())
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, useData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => {
  return useContext(AuthContext);
};