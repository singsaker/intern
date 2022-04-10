export default interface UserProps {
  username: string;
  password: string;
  email: string;
  member: {
    id: number;
    firstName?: string;
    lastName?: string;
  };
}

export interface MemberProps {
  id: number;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phone?: string;
  user: UserProps;
}
