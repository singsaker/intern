import { MemberProps } from './user';

export default interface ProjectType {
  id: number;
  name: string;
  description?: string;
  projectMembers: Array<ProjectMemberProps>;
}

export interface ProjectMemberProps {
  id: number;
  member: MemberProps;
  project: ProjectType;
  allocatedTime: number;
  workPending: string;
  workApproved: string;
  workDisapproved: string;
}

export interface WorkProps {
  id: number;
  description: string;
  status: number;
  duration: string;
  registerDate: string;
  executionDate: string;
  member: MemberProps;
}

export interface WorkCategoryProps {
  id: number;
  name: string;
}

export interface ProjectCategoryProps {
  id: number;
  name: string;
}
