export type CreateArticleRequest = {
  title: string;
  content: string;
  categoryIds: number[];
  published: boolean;
};

export type UpdateArticleRequest = {
  title?: string;
  content?: string;
  image?: string;
  categoryIds?: number[];
  published?: boolean;
};

export type CreateCommentRequest = {
  name: string;
  email: string;
  content: string;
};
