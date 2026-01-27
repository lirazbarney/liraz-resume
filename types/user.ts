export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  created_at: string;
};

export type UserWithoutPassWord = Omit<User, "password">;

export type CreateUserErrors = {
  email?: string;
  name?: string;
  password?: string;
  general?: string;
};

export type CreateUserResult = {
  ok: boolean;
  errors?: CreateUserErrors;
  id?: number;
};

export type updateUserResult = {
  ok: boolean;
  errors?: CreateUserErrors;
};
