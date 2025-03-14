import { IsArray } from 'class-validator';

import { PaginationMetadataDto } from './page-meta.dto';
import { PaginationDto } from './page-options.dto';

export class PaginationResultDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PaginationMetadataDto;

  constructor(
    data: T[],
    itemCount: number,
    options: {
      page: number;
      limit: number;
    },
  ) {
    this.data = data;
    this.meta = new PaginationMetadataDto({
      itemCount,
      pageOptionsDto: options as PaginationDto,
    });
  }
}
