import React, { useState } from 'react';

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
      />
      <button type="submit" disabled={!comment.trim()}>
        Post Comment
      </button>
    </form>
  );
};



export default CommentForm;
