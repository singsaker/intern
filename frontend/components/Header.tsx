import { useAuthentication } from "@api/authentication";
import NextLink from "next/link";

const Header = () => {
  const { useData } = useAuthentication();
  const { username } = useData();

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {username ? "Velkommen " + username : "Du er ikke logget inn"}
      <NextLink href="/">Logg inn</NextLink>
      <NextLink href="/dashboard">Dashboard</NextLink>
    </div>
  )
}

export default Header;