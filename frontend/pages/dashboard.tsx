import { useQuery } from "@apollo/client";
import Layout from "src/components/Layout";
import { GET_MEMBERS } from "@graphql/members/queries";
import DashboardLayout from "src/layouts/dashboard"

function Dashboard() {
  const { data, loading, error } = useQuery(GET_MEMBERS)

  console.log(data?.allMembers)

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  )
}

export default Dashboard;