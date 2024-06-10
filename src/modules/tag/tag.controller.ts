import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TagService } from './services/tag.service';
import { SkipAuth } from "../auth/decorators/skip-auth.decorator";
import { TagResDto } from "./dto/res/tag.res.dto";

@Controller('tags')
@ApiTags('Tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('popular')
  @SkipAuth()
  public async getPopular(): Promise<TagResDto[]> {
    return await this.tagService.getPopular();
  }
}
