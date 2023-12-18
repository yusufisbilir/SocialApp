import { useUserContext } from '@/context/AuthContext';
import { multiFormatDateString } from '@/lib/utils';
import { Models } from 'appwrite';
import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  return (
    <div className='w-full max-w-screen-sm p-5 border rounded-3xl lg:p-7'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl || '/icons/default-avatar.png'}
              alt={post.creator.name}
              className='w-12 rounded-full lg:h-12'
            />
          </Link>

          <div className='flex flex-col'>
            <p className='text-lg font-semibold lg:font-bold'>
              {post.creator.name}
            </p>
            <div className='flex items-center text-sm text-gray-400 gap-x-2'>
              <p>{multiFormatDateString(post?.$createdAt)}</p>-
              <p>{post?.location}</p>
            </div>
          </div>
        </div>
        <Link
          to={`/update/post/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'}`}
        >
          <Edit className='w-5 h-5 text-gray-500' />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className='py-5'>
          <p>{post.caption}</p>
          <ul className='flex gap-1 mt-2'>
            {post?.tags?.map((tag: string) => (
              <li key={tag} className='text-gray-400'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl}
          className='h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5'
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
