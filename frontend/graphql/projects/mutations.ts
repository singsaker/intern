import { gql } from '@apollo/client';

export const CREATE_WORK = gql`
  mutation createWork($workData: BaseWorkInput!) {
    createWork(workData: $workData) {
      work {
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
      ok
    }
  }
`;

export const UPDATE_WORK = gql`
  mutation updateWork($id: ID!, $workData: UpdateWorkInput!) {
    updateWork(id: $id, workData: $workData) {
      work {
        id
        description
        status
        duration
        executionDate
        registerDate
      }
      ok
    }
  }
`;

export const CREATE_PROJECT_MEMBER = gql`
  mutation createProjectMember($member: ID!, $project: ID!, $allocatedTime: Int) {
    createProjectMember(member: $member, project: $project, allocatedTime: $allocatedTime) {
      projectMember {
        id
        allocatedTime
      }
      ok
    }
  }
`;

export const UPDATE_PROJECT_MEMBER = gql`
  mutation updateProjectMember($id: ID!, $allocatedTime: Int) {
    updateProjectMember(id: $id, allocatedTime: $allocatedTime) {
      projectMember {
        id
        allocatedTime
      }
      ok
    }
  }
`;

export const DELETE_PROJECT_MEMBER = gql`
  mutation deleteProjectMember($id: ID!) {
    deleteProjectMember(id: $id) {
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

export const GENERATE_SEMESTER_PROJECT = gql`
  mutation generateSemesterProject($projectData: BaseProjectInput!) {
    generateSemesterProject(projectData: $projectData) {
      project {
        id
        name
        hours
        projectCategory {
          id
          name
        }
      }
      ok
    }
  }
`;
