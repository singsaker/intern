import { gql } from '@apollo/client';

export const GET_SHOPS = gql`
  {
    allShops {
      id
      name
      slug
      description
      products {
        id
        name
        description
        price
        quantity
        productCategories {
          id
          name
          description
        }
      }
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
      sales {
        id
        member {
          firstName
          lastName
        }
        product {
          name
        }
        quantity
        price
        date
      }
      productCategories {
        id
        name
        description
      }
      products {
        id
        name
        description
        price
        quantity
        productCategories {
          id
          name
          description
        }
      }
    }
  }
`;

export const GET_SALES = gql`
  query allSales($shop: ID!, $member: ID) {
    allSales(shop: $shop, member: $member) {
      id
      member {
        firstName
        lastName
      }
      product {
        name
      }
      quantity
      price
      date
    }
  }
`;
