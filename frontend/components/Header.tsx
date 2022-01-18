import { useAuthentication } from "@api/authentication";


const Header = () => {
  const { useData } = useAuthentication();
  const { username } = useData();

  return (
    <div>
      {username ? "Velkommen " + username : "Du er ikke logget inn"}
    </div>
  )
}

export default Header;