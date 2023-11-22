import * as z from 'zod';

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  userName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});
