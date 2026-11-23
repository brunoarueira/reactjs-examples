import type { Comment, NewComment } from './components/CommentTypes';

const API_ENDPOINT = '/api/comments';

export const postComment = async ({ author, text }: NewComment): Promise<Comment[]> => {
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

  return (await response.json()) as Comment[];
};

export const getComments = async (signal?: AbortSignal): Promise<Comment[]> => {
  const response = await fetch(API_ENDPOINT, { signal: signal ?? null });

  if (!response.ok) throw new Error(`Error status: ${response.status.toString()}`);

  return (await response.json()) as Comment[];
};
