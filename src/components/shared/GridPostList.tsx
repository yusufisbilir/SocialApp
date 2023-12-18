import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import PostStats from './PostStats';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className='grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7'>
      {posts.map((post) => (
        <li key={post.$id} className='relative min-w-80 h-80'>
          <Link
            to={`/post/${post.$id}`}
            className='flex rounded-[24px] border border-dark-4 overflow-hidden cursor-pointer w-full h-full'
          >
            <img
              src={post.imageUrl}
              alt='post'
              className='object-cover w-full h-full'
            />
          </Link>

          <div className='absolute bottom-0 p-5 flex-between w-full bg-gradient-to-t from-dark-3 to-transparent rounded-b-[24px] gap-2'>
            {showUser && (
              <div className='flex items-center justify-start flex-1 gap-2'>
                <img
                  src={
                    post.creator.imageUrl || '/assets/icons/default-avatar.svg'
                  }
                  alt='creator'
                  className='w-8 h-8 rounded-full'
                />
                <p className='line-clamp-1'>{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
