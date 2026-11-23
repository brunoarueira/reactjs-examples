import type { CommentProps } from './CommentTypes';

const Comment = ({ author, text }: CommentProps) => (
  <div className="comment">
    <h2 className="commentAuthor">{author}</h2>
    <span>{text}</span>
  </div>
);

export default Comment;
