import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Customer 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MALE' })
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ example: '2021-01-01' })
  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @ApiProperty({ example: 'Parent Name 1' })
  @IsNotEmpty()
  @IsString()
  parentName: string;

  @ApiProperty({ example: '0987654321' })
  @IsNotEmpty()
  @IsString()
  parentPhone: string;

  @ApiProperty({ example: 'Address' })
  @IsOptional()
  @IsString()
  address?: string;
}
