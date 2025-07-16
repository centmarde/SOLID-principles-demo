import React, { useState } from 'react';

interface LikesProps {
  initialCount?: number;
  onLikeChange?: (count: number) => void;
}

const Likes: React.FC<LikesProps> = ({ initialCount = 0, onLikeChange }) => {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    const newCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newCount);
    setIsLiked(!isLiked);
    onLikeChange?.(newCount);
  };

  return (
    <div>
      <button onClick={handleLike} className={isLiked ? 'liked' : ''}>
        {isLiked ? '❤️' : '🤍'} {likeCount}
      </button>
    </div>
  );
};

export default Likes;
