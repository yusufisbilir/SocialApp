import PostForm from '@/components/forms/PostForm';
import { ImagePlus } from 'lucide-react';

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='flex flex-col items-center flex-1 gap-10 px-5 py-10 overflow-auto md:px-8 lg:p-14'>
        <div className='flex items-center w-full max-w-5xl gap-3'>
          <ImagePlus size={36} />
          <h2 className='text-xl font-semibold'>Create Post</h2>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
