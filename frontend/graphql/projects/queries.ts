import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query {
    allProjects {
      id
      name
      projectCategory {
        id
        name
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      hours
      description
      members {
        firstName
        lastName
      }
    }
  }
`;

export const GET_PROJECT_MEMBER = gql`
  query projectMember($project: ID!, $member: ID!) {
    projectMember(project: $project, member: $member) {
      allocatedTime
    }
  }
`;

export const GET_TOTAL_TIME_SPENT = gql`
  query totalTimeSpent($project: Int!, $member: Int!) {
    totalTimeSpent(project: $project, member: $member)
  }
`;
