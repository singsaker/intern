import { gql } from '@apollo/client';

export const GET_MEMBERS = gql`
  query allMembers {
    allMembers {
      id
      firstName
      lastName
      phone
      birthDate
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
        phone
        birthDate
      }
    }
  }
`;

export const GET_MEMBER = gql`
  query member($id: ID!) {
    member(id: $id) {
      id
      firstName
      lastName
      phone
      birthDate
      user {
        email
      }
    }
  }
`;
