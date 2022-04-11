import { gql } from '@apollo/client';

export const GET_SHIFT_DATES = gql`
  query allShiftDates($semester: ID!, $member: ID) {
    allShiftDates(semester: $semester, member: $member) {
      date
      shifts {
        id
        shiftType
        member {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
