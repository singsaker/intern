import { useAuthentication } from '@api/authentication';
import { useQuery } from "@apollo/client";
import Loading from '@components/Loading';
import { GET_MEMBERS } from "@graphql/members/queries";
import React from 'react';
import DashboardLayout from "src/layouts/dashboard";
import ShiftModule from "src/views/work/ShiftModule";
import WorkModule from "src/views/work/WorkModule";


export default function Work() {
  const { useData } = useAuthentication()
  const { data, loading, error } = useQuery(GET_MEMBERS)
  const { username } = useData();

  if (loading || !username) {
    return <Loading />
  }

  return (
    <main>
      <DashboardLayout>
        <WorkModule />
        <ShiftModule />
      </DashboardLayout>
    </main>
  )
}