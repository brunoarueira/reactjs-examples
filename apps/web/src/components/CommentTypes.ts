export interface Comment {
  id: number;
  author: string;
  text: string;
}

export type NewComment = Omit<Comment, 'id'>;

export type CommentProps = Pick<Comment, 'author' | 'text'>;
