import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { ITagsRO } from './tag.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async findAll(): Promise<ITagsRO> {
    const tags = await this.tagRepository.findAll();
    return { tags: tags.map((tag) => tag.tag) };
  }
  async createTag(tagName: string): Promise<Tag> {
    // Check if the tag already exists in the database
    let tag = await this.tagRepository.findOne({ tag: tagName });

    if (!tag) {
      // If the tag doesn't exist, create a new one
      tag = new Tag();
      tag.tag = tagName;
      await this.tagRepository.persistAndFlush(tag);
    }

    return tag;
  }
}
