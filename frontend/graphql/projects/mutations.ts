import { gql } from '@apollo/client';

export const CREATE_WORK = gql`
  mutation createWork($workData: BaseWorkInput!) {
    createWork(workData: $workData) {
      work {
        id
      }
      ok
    }
  }
`;

export const UPDATE_WORK = gql`
  mutation updateWork($id: ID!, $workData: UpdateWorkInput!) {
    updateWork(id: $id, workData: $workData) {
      work {
        id
      }
      ok
    }
  }
`;

export const DELETE_WORK = gql`
  mutation deleteWork($id: ID!) {
    deleteWork(id: $id) {
      ok
    }
  }
`;
