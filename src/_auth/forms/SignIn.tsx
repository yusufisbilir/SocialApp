import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignInValidation } from '@/lib/validation';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/_constants/ROUTES';
import { useUserContext } from '@/context/AuthContext';
import { useSignIn } from '@/lib/react-query/queriesMutations';
import { toast } from '@/components/ui/use-toast';

const SignIn = () => {
  const { checkAuthUser, isLoading: isUserAuthenticating } = useUserContext();
  const { mutateAsync: signIn, isPending: isSigningIn } = useSignIn();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInValidation>) => {
    const { email, password } = values;
    const session = await signIn({ email, password });

    if (!session) {
      return toast({
        title: 'Sign in failed. Please try again.',
        variant: 'destructive',
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate(ROUTES.HOME);
    } else {
      return toast({
        title: 'Sign up failed. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-3xl font-semibold'>Sign In</h1>
        <p>
          Don't have an account?{' '}
          <Link to={ROUTES.SIGN_UP} className='text-purple-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col w-full gap-3 px-4 mt-6 sm:w-96 sm:px-0'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='text-white bg-purple-600 text-md hover:bg-purple-500'
          disabled={isUserAuthenticating || isSigningIn}
        >
          {isUserAuthenticating || isSigningIn ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
};

export default SignIn;
