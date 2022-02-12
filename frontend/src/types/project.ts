import { MemberProps } from './user';

export default interface ProjectType {
  id: number;
  name: string;
  description?: string;
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
