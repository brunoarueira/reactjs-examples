import Comment from './Comment';
import type { Comment as CommentData } from './CommentTypes';

interface CommentListProps {
  comments: CommentData[];
}

const CommentList = ({ comments }: CommentListProps) => (
  <div className="commentList">
    {comments.map((comment) => (
      <Comment key={comment.id} {...comment} />
    ))}
  </div>
);

export default CommentList;
