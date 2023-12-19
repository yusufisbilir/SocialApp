import GridPostList from '@/components/shared/GridPostList';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import {
  useGetPosts,
  useSearchPosts,
} from '@/lib/react-query/queriesMutations';
import { Filter, Loader, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className='w-full h-full flex-center'>
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item: any) => item.documents.length === 0);

  return (
    <div className='flex flex-col items-center flex-1 px-5 py-10 overflow-auto md:p-14'>
      <div className='flex flex-col w-full max-w-5xl gap-6 md:gap-9'>
        <h2 className='text-xl font-semibold'>Search Posts</h2>
        <div className='flex items-center w-full gap-1 px-4'>
          <Search />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className='flex items-center justify-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='font-semibold'>Popular Today</h3>
        <div className='flex items-center gap-3 px-4 py-2 cursor-pointer'>
          <p className='text-sm'>All</p>
          <Filter />
        </div>
      </div>

      <div className='flex flex-wrap w-full max-w-5xl gap-9'>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className='w-full mt-10 text-center text-light-4'>End of posts</p>
        ) : (
          posts.pages.map((item: any, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className='w-full mt-10 text-center text-light-4'>No results found</p>
    );
  }
};
