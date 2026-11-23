export interface CommentData {
  id: number;
  author: string;
  text: string;
}

export type NewComment = Omit<CommentData, 'id'>;

export type CommentProps = Pick<CommentData, 'author' | 'text'>;
