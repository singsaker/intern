import { client } from "@api/apolloClient";
import { useQuery } from "@apollo/client";
import { AUTHENTICATE, DELETE_TOKEN_COOKIE } from "@graphql/members/mutations";
import { GET_USER } from "@graphql/members/queries";
import Router from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  userDetails?: UserProps;
  setUser: (u: UserProps | undefined) => void;
  signIn: any;
  signOut: any;
}>({
  userDetails: undefined,
  setUser: () => { },
  signIn: undefined,
  signOut: undefined
});

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface UserProps {
  username: string;
  password: string;
  member: {
    id: number;
    firstName?: string;
    lastName?: string;
  }
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  const { data, loading, error } = useQuery(GET_USER);

  useEffect(() => {
    setUser(data);
  }, [data]);

  const signIn = async ({ username, password }: UserProps) => {
    await client.mutate({
      mutation: AUTHENTICATE,
      variables: { username, password },
    }).then(() => {
      Router.push("/")
    })
  };

  const signOut = async () => {
    await client.mutate({
      mutation: DELETE_TOKEN_COOKIE,
    }).then(() => {
      Router.push("/login")
    })
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, ...user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthContext);
