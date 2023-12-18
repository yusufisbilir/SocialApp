import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import FileUploader from '../shared/FileUploader';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import { useCreatePost } from '@/lib/react-query/queriesMutations';
import { useUserContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/_constants/ROUTES';

type IProps = {
  post?: Models.Document;
};

const PostForm = ({ post }: IProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post?.caption ?? '',
      file: [],
      location: post?.location ?? '',
      tags: post?.tags ? post?.tags?.join(',') : '',
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user?.id,
    });
    if (!newPost) {
      toast({ title: 'Please try again' });
    }
    navigate(ROUTES.HOME);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col w-full max-w-5xl gap-8'
      >
        {/* Caption */}
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        {/* Photo Upload */}
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        {/* Location */}
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        {/* Tags */}
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormDescription>Seperated by comma ","</FormDescription>
              <FormControl>
                <Input type='text' placeholder='JS, React, Vue' {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            className='text-white bg-slate-700 hover:bg-slate-600'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='text-white bg-purple-700 submit hover:bg-purple-600'
            disabled={isLoadingCreate}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
