import { client } from "@api/apolloClient";
import { useQuery } from "@apollo/client";
import { loginMutation, userDetails } from "@graphql/members/queries";
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
    const { loading, error, data } = useQuery(userDetails)

    if (!error && !loading) {
      return { ...data.userDetails }
    } else {
      return {}
    }
  }

  const signIn = async ({ username, password }: UserProps) => {
    await client.mutate({
      mutation: loginMutation,
      variables: { username, password },
    }).then(() => Router.push("/dashboard"))
  };

  return (
    <AuthContext.Provider value={{ signIn, useData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => {
  return useContext(AuthContext);
};