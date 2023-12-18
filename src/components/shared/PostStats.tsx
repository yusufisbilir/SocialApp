import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queriesMutations';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite';
import { Bookmark, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

type IProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: IProps) => {
  const likeList = post.likes.map((like: Models.Document) => like.$id);
  const [likes, setLikes] = useState<string[]>(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  const handleLikePost = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  return (
    <div className='z-20 flex items-center justify-between'>
      <div className='flex items-center gap-2 mr-5'>
        <Heart
          className={`w-5 h-5 cursor-pointer ${
            checkIsLiked(likes, userId) ? 'stroke-red-500 fill-red-500' : ''
          }`}
          onClick={(e) => handleLikePost(e)}
        />
        <p className='text-sm'>{likes.length}</p>
      </div>
      <Bookmark
        className={`w-5 h-5 cursor-pointer ${
          isSaved ? 'stroke-purple-700 fill-purple-700' : ''
        }`}
        onClick={(e) => handleSavePost(e)}
      />
    </div>
  );
};

export default PostStats;
