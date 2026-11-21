import { useState, useEffect } from 'react';

import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import type { CommentData, NewComment } from './components/CommentTypes';
import { logError } from './helpers';

const API_ENDPOINT = '/api/comments';

const fetchData = async function () {
  try {
    const response = await fetch(API_ENDPOINT);

    if (!response.ok) throw new Error(`Error status: ${response.status.toString()}`);

    return (await response.json()) as CommentData[];
  } catch (error) {
    logError(error);

    return [];
  }
};

export function App() {
  const [comments, setComments] = useState<CommentData[]>([]);

  const handleCommentSubmit = async function ({ author, text }: NewComment) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, text }),
      });

      if (!response.ok) {
        throw new Error(`Error status: ${response.status.toString()}`);
      }

      setComments((await response.json()) as CommentData[]);

      return true;
    } catch (error) {
      logError(error);

      return false;
    }
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
