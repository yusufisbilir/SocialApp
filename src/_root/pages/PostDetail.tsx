import GridPostList from '@/components/shared/GridPostList';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import {
  useDeletePost,
  useGetPostById,
  useGetUserPosts,
} from '@/lib/react-query/queriesMutations';
import { multiFormatDateString } from '@/lib/utils';
import { ArrowLeft, Delete, Edit, Loader } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data: post, isLoading } = useGetPostById(id ?? '');
  const { mutate: deletePost } = useDeletePost();
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className='flex flex-col items-center flex-1 gap-10 px-5 py-10 overflow-auto md:p-14'>
      <div className='hidden w-full max-w-5xl md:flex'>
        <Button
          onClick={() => navigate(-1)}
          variant='ghost'
          className='flex items-center justify-start gap-4 hover:bg-transparent hover:text-white'
        >
          <ArrowLeft className='w-5 h-5' />
          <p className='font-medium'>Back</p>
        </Button>
      </div>
      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className='w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border xl:rounded-l-[24px]'>
          <img
            src={post?.imageUrl}
            alt='creator'
            className='h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5'
          />

          <div className='flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]'>
            <div className='flex items-center justify-between w-full'>
              <Link
                to={`/profile/${post?.creator.$id}`}
                className='flex items-center gap-3'
              >
                <img
                  src={
                    post?.creator.imageUrl || '/assets/icons/default-avatar.svg'
                  }
                  alt='creator'
                  className='w-8 h-8 rounded-full lg:w-12 lg:h-12'
                />
                <div className='flex flex-col gap-1'>
                  <p className='text-lg font-semibold lg:font-bold'>
                    {post?.creator.name}
                  </p>
                  <div className='flex items-center text-sm text-gray-400 gap-x-2'>
                    <p>{multiFormatDateString(post?.$createdAt)}</p>•
                    <p>{post?.location}</p>
                  </div>
                </div>
              </Link>

              <div className='flex items-center gap-4 gap-x-2'>
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <Edit className='w-5 h-5 text-gray-500 cursor-pointer' />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant='ghost'
                  className={`p-0 flex gap-3 hover:bg-transparent ${
                    user.id !== post?.creator.$id && 'hidden'
                  }`}
                >
                  <Delete className='w-5 h-5 text-gray-500 cursor-pointer' />
                </Button>
              </div>
            </div>

            <hr className='w-full border' />

            <div className='flex flex-col flex-1 w-full'>
              <p>{post?.caption}</p>
              <ul className='flex gap-1 mt-2'>
                {post?.tags.map((tag: string, index: string) => (
                  <li key={`${tag}${index}`} className='text-gray-400'>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      {/* More related posts */}
      <div className='w-full max-w-5xl'>
        <hr className='w-full border' />

        <h3 className='w-full my-10'>More Related Posts</h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetail;
