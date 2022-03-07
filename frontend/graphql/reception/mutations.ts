import { gql } from '@apollo/client';

export const CREATE_SHIFT = gql`
  mutation createShift($date: Date!, $member: ID!, $semester: ID!, $type: Int!) {
    createShift(date: $date, member: $member, semester: $semester, type: $type) {
      shift {
        id
        shiftType
        member {
          id
          firstName
          lastName
        }
        shiftDate {
          date
        }
      }
      ok
    }
  }
`;

export const UPDATE_SHIFT = gql`
  mutation updateShift($id: ID!, $member: ID!) {
    updateShift(id: $id, member: $member) {
      shift {
        id
        shiftType
        member {
          id
          firstName
          lastName
        }
        shiftDate {
          date
        }
      }
      ok
    }
  }
`;

export const DELETE_SHIFT = gql`
  mutation deleteShift($id: ID!) {
    deleteShift(id: $id) {
      ok
    }
  }
`;
