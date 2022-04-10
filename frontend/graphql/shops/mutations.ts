import { gql } from '@apollo/client';

const productData = `
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
`;

export const CREATE_PRODUCT_CATEGORY = gql`
  mutation createProductCategory($shop: ID!, $name: String!, $description: String) {
    createProductCategory(shop: $shop, name: $name, description: $description) {
      productCategory {
        id
        name
        description
      }
      ok
    }
  }
`;

export const UPDATE_PRODUCT_CATEGORY = gql`
  mutation updateProductCategory($id: ID!, $name: String!, $description: String) {
    updateProductCategory(id: $id, name: $name, description: $description) {
      productCategory {
        id
        name
        description
      }
      ok
    }
  }
`;

export const DELETE_PRODUCT_CATEGORY = gql`
  mutation deleteProductCategory($id: ID!) {
    deleteProductCategory(id: $id) {
      ok
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($shop: ID!, $productCategories: [ID], $productData: ProductBaseInput) {
    createProduct(shop: $shop, productCategories: $productCategories, productData: $productData) {
      product {
          ${productData}
      }
      ok
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $productCategories: [ID], $productData: ProductBaseInput) {
    updateProduct(id: $id, productCategories: $productCategories, productData: $productData) {
      product {
          ${productData}
      }
      ok
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      ok
    }
  }
`;

export const CREATE_SALE = gql`
  mutation createSale($shop: ID!, $member: ID!, $product: ID!, $quantity: Int!) {
    createSale(shop: $shop, member: $member, product: $product, quantity: $quantity) {
      ok
    }
  }
`;
