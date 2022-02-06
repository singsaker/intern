import { useQuery } from "@apollo/client";
import { GET_USER } from "@graphql/members/queries";
import { createContext, useContext, useEffect, useState } from "react";

interface UserProps {
  username: string;
}

const UserContext = createContext<{
  user?: UserProps | undefined;
  loading?: boolean;
  userDetails?: UserProps;
  setUser: (u: UserProps | undefined) => void;
}>({
  user: undefined,
  setUser: () => { },
});

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  const { data, loading, error } = useQuery(GET_USER);

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <UserContext.Provider value={{ ...user, loading, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);