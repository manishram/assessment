import { Profile } from './profile';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
  co_authors: string;
  editor_id: number;
  edit_status: boolean;
  updated_at: Date;
}

export interface ArticleResponse {
  article: Article;
}
