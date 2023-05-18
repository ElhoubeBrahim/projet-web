export type CreateArticleRequest = {
  title: string;
  content: string;
  categoryIds: number[];
};

export type UpdateArticleRequest = {
  title?: string;
  content?: string;
  image?: string;
  categoryIds?: number[];
  published?: boolean;
};
