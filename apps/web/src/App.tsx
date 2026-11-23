import { useState } from 'react';

import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import type { Comment, NewComment } from './components/CommentTypes';
import { postComment, getComments } from './api';
import usePolling from './hooks/usePolling';
import usePageVisibility from './hooks/usePageVisibility';

export function App() {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentSubmit = async (comment: NewComment): Promise<void> => {
    setComments(await postComment(comment));
  };

  const load = async (signal: AbortSignal) => {
    const data = await getComments(signal);

    setComments(data);
  };

  const isVisible = usePageVisibility();

  const { error: pollingError } = usePolling(load, isVisible, 2000);

  return (
    <main>
      <h1>Comments</h1>
      {pollingError && (
        <div style={{ display: 'block', backgroundColor: 'red', padding: '2px' }} role="alert">
          Couldn't refresh comments
        </div>
      )}
      <CommentList comments={comments} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </main>
  );
}
