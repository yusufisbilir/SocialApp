import { INewUser, ISignIn } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, createUser, signIn, signOutUser } from '../appwrite/api';
import { INewPost } from '@/types/post';
import { QUERY_KEYS } from './QueryKeys';

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

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signOutUser(),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
