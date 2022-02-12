import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query allProjects {
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

export const GET_WORK_CATEGORIES = gql`
  query allWorkCategories {
    allWorkCategories {
      id
      name
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

export const GET_WORK = gql`
  query allWork($project: ID!, $member: ID) {
    allWork(project: $project, member: $member) {
      id
      member {
        id
        firstName
        lastName
      }
      description
      status
      duration
      executionDate
      registerDate
    }
  }
`;

export const GET_TOTAL_TIME_SPENT = gql`
  query totalTimeSpent($project: ID, $member: ID) {
    totalTimeSpent(project: $project, member: $member)
  }
`;
