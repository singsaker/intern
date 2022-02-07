export default interface UserProps {
  username: string;
  password: string;
  member: {
    id: number;
    firstName?: string;
    lastName?: string;
  };
}
