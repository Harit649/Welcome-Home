import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

/**
 * Pagination Request DTO
 */
export class PaginationRequestDto {
  @ApiProperty({ required: false, type: Number, example: 1 })
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  @IsOptional()
  public readonly currentPage: number;

  @ApiProperty({ required: false, type: Number, example: 10 })
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  @IsOptional()
  public readonly recordPerPage: number;
}
