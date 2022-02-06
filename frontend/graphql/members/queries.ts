import { gql } from '@apollo/client';

export const GET_MEMBERS = gql`
  query allMembers {
    allMembers {
      id
      firstName
      lastName
    }
  }
`;

export const GET_USER = gql`
  query {
    userDetails {
      id
      username
      email
      member {
        id
        firstName
        lastName
      }
    }
  }
`;
