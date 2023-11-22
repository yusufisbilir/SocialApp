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
import { SignUpValidation } from '@/lib/validation';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/_constants/ROUTES';

const SignUp = () => {
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      userName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpValidation>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-3xl font-semibold'>Sign Up</h1>
        <p>
          Already have an account?{' '}
          <Link to={ROUTES.SIGN_IN} className='text-purple-500 hover:underline'>
            Sign In
          </Link>
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col w-full gap-3 px-4 mt-6 sm:w-96 sm:px-0'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
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
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUp;
