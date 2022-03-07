import { gql } from '@apollo/client';

export const GET_SHIFT_DATES = gql`
  query allShiftDates($semester: ID!) {
    allShiftDates(semester: $semester) {
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
