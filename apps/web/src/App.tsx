import { useState, useEffect } from 'react';

import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import type { Comment, NewComment } from './components/CommentTypes';
import { postComment, getComments } from './api';
import { logError } from './helpers';

export function App() {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentSubmit = async (comment: NewComment): Promise<void> => {
    setComments(await postComment(comment));
  };

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const signal = controller.signal;

        const data = await getComments(signal);

        setComments(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        logError(error);
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main>
      <h1>Comments</h1>
      <CommentList comments={comments} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </main>
  );
}
