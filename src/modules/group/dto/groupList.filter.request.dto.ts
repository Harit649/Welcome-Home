import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsObject, IsOptional, ValidateIf, ValidateNested } from "class-validator";
import { GROUP_STATUS } from "src/constant";
import { PaginationRequestDto } from "src/dto/pagination.request.dto";

export class groupFilter{

    @ApiPropertyOptional({ example: 'hello' })
    @IsOptional()
    readonly groupName: string;

    @ApiPropertyOptional({ example: 'hi' })
    @IsOptional()
    readonly schemaName: string;

    @ApiPropertyOptional({enum: [GROUP_STATUS.ACTIVE]})
    @IsEnum([GROUP_STATUS.ACTIVE])
    @IsOptional()
    readonly groupStatus: GROUP_STATUS
   
}

export class groupListFilterRequestDto extends PaginationRequestDto{

    @ValidateNested()
    @Type(() => groupFilter)
    @IsObject()
    @IsOptional()
    readonly filter: groupFilter;

    @ApiPropertyOptional({
        example: 'groupName',
        description: `'groupName', 'schemaName', 'groupStatus'`,
    })
    @IsEnum(['groupName', 'schemaName', 'groupStatus'])
    @ValidateIf((e) => e.sort_by !== null && e.sort_by !== '' && e.sort_by !== undefined)
    public readonly sort_by?: string;

    @ApiPropertyOptional({ example: 'ASC' })
    @IsEnum(['ASC', 'DESC', ''])
    @ValidateIf((e) => e.sort_type !== null && e.sort_type !== '' && e.sort_type !== undefined)
    public readonly sort_type?: string;
}