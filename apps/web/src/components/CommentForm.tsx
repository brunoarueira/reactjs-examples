import type { SubmitEvent } from 'react';
import { useState } from 'react';
import type { NewComment } from './CommentTypes';
import { logError } from '../helpers';

const EMPTY_STATE = '';

interface CommentFormProps {
  onCommentSubmit: (comment: NewComment) => Promise<void>;
}

const CommentForm = ({ onCommentSubmit }: CommentFormProps) => {
  const [author, setAuthor] = useState(EMPTY_STATE);
  const [text, setText] = useState(EMPTY_STATE);

  const handleSubmit = function (event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedAuthor = author.trim(),
      trimmedText = text.trim();

    if (!trimmedText || !trimmedAuthor) {
      return;
    }

    onCommentSubmit({ author: trimmedAuthor, text: trimmedText })
      .then(() => {
        setAuthor(EMPTY_STATE);
        setText(EMPTY_STATE);
      })
      .catch((error: unknown) => {
        logError(error);
      });
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Say something..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <input type="submit" value="Post" />
    </form>
  );
};

export default CommentForm;
