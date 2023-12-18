import PostCard from '@/components/shared/PostCard';
import { useGetRecentPosts } from '@/lib/react-query/queriesMutations';
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className='flex grow'>
      <div className='flex flex-col items-center gap-10 px-5 py-10 overflow-auto grow md:px-8 lg:p-14'>
        <div className='flex flex-col items-center w-full max-w-screen-sm gap-6 md:gap-9'>
          <h2 className='w-full text-2xl font-semibold text-left'>Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 w-full gap-9'>
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
