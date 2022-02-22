import { gql } from '@apollo/client';

export const GET_SHOPS = gql`
  {
    allShops {
      id
      name
      slug
      description
    }
  }
`;

export const GET_SHOP = gql`
  query shop($id: ID!) {
    shop(id: $id) {
      id
      name
      slug
      description
    }
  }
`;
