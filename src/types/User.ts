export default interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  userId: string;
  name: string;
  email: string;
}