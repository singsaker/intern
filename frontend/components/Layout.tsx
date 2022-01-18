import { useAuthentication } from "@api/authentication";
import Header from "./Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Layout = ({ children }: Props) => {
  const { signOut, useData } = useAuthentication();
  const { username } = useData();

  return (
    <>
      <Header />
      <section style={{ maxWidth: 400, margin: "0 auto", paddingTop: 30 }}>
        {children}
      </section>

      {username && <button onClick={() => signOut()}>Logg ut</button>}
    </>
  )
}

export default Layout;