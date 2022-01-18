import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
  query allMembers {
    allMembers {
      id
      firstName
      lastName
    }
  }
`;

export const loginMutation = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
    }
  }
`;

export const userDetails = gql`
  query {
    userDetails {
      id
      username
      email
    }
  }
`;
