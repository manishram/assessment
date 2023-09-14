import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';

@Entity()
export class CoAuthor {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Article)
  article!: Article;
}
