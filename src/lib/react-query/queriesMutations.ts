import { INewUser, ISignIn } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { createUser, signIn } from '../appwrite/api';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUser(user),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (user: ISignIn) => signIn(user),
  });
};