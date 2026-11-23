import { useState, useEffect } from 'react';

import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import type { Comment, NewComment } from './components/CommentTypes';
import { logError } from './helpers';
import { postComment } from './api';

const API_ENDPOINT = '/api/comments';

const fetchData = async function () {
  try {
    const response = await fetch(API_ENDPOINT);

    if (!response.ok) throw new Error(`Error status: ${response.status.toString()}`);

    return (await response.json()) as Comment[];
  } catch (error) {
    logError(error);

    return [];
  }
};

export function App() {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentSubmit = async (comment: NewComment): Promise<void> => {
    setComments(await postComment(comment));
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchData();

      setComments(data);
    };

    void load();
  }, []);

  return (
    <main>
      <h1>Comments</h1>
      <CommentList comments={comments} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </main>
  );
}
