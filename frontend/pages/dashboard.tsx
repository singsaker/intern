import { useQuery } from "@apollo/client";
import Layout from "@components/Layout";
import { GET_MEMBERS } from "@graphql/members/queries";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_MEMBERS)

  console.log(data?.allMembers)

  return (
    <Layout>
      <h1>Dette er en side med alle folkene</h1>
      {(loading || error) ? (
        <p>laster...</p>
      ) : (
        <>
          <h3>Beboere</h3>
          <ul>
            {data.allMembers.map((member: { id: number, firstName?: string, lastName?: string }) => {
              return <li key={member.id}>{member.firstName + " " + member.lastName}</li>
            })}
          </ul>
        </>
      )}
    </Layout>
  )
}

export default Dashboard;