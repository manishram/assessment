import {
  ArrayType,
  Collection,
  Entity,
  EntityDTO,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import slug from 'slug';

import { User } from '../user/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Article {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property()
  slug: string;

  @Property()
  title: string;

  @Property()
  description = '';

  @Property()
  body = '';

  @Property({ type: 'string' })
  createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  @Property({ type: 'string', onUpdate: () => new Date().toISOString().slice(0, 19).replace('T', ' ') })
  updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  @Property({ type: ArrayType })
  tagList: string[] = [];

  @ManyToOne(() => User)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article, { eager: true, orphanRemoval: true })
  comments = new Collection<Comment>(this);

  @Property({ type: 'number' })
  favoritesCount = 0;

  @Property()
  co_authors = '';

  @Property()
  edit_status: number = 0;

  @Property()
  editor_id: number;

  constructor(author: User, title: string, description: string, body: string, co_authors: string) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.body = body;
    this.co_authors = co_authors;
    this.editor_id = author.id;
    this.slug = slug(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  toJSON(user?: User) {
    const o = wrap<Article>(this).toObject() as ArticleDTO;
    o.favorited = user && user.favorites.isInitialized() ? user.favorites.contains(this) : false;
    o.author = this.author.toJSON(user);

    return o;
  }
}

export interface ArticleDTO extends EntityDTO<Article> {
  favorited?: boolean;
}
