import { Dispatch, SetStateAction } from 'react';

export type INewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type ISignIn = {
  email: string;
  password: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type IUserContext = {
  user: IUser;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
