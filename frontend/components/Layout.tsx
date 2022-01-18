import Header from "./Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <section style={{ maxWidth: 400, margin: "0 auto", paddingTop: 30 }}>
        {children}
      </section>
    </>
  )
}

export default Layout;