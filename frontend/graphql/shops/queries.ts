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
  query shop($slug: String!) {
    shop(slug: $slug) {
      id
      name
      slug
      description
    }
  }
`;
