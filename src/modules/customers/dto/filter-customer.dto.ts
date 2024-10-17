import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationParamsDto } from 'src/dtos/pagination-params.dto';

export class FilterCustomerDto extends PaginationParamsDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo số điện thoại hoặc tên',
  })
  search?: string;

  constructor() {
    super();
  }
}
