import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsObject, IsOptional, ValidateIf, ValidateNested } from "class-validator";
import { USER_ROLES } from "src/constant";
import { PaginationRequestDto } from "src/dto/pagination.request.dto"

export class userFilter{

    @ApiPropertyOptional({ example: 'harit' })
    @IsOptional()
    readonly user_name: string;

    @ApiPropertyOptional({ example: 'makwanaharit@gmail.com' })
    @IsOptional()
    readonly email: string;

    @ApiPropertyOptional({ enum: ['ACTIVE', 'BLOCKED'] })
    @IsEnum(['ACTIVE', 'BLOCKED', ''])
    @IsOptional()
    readonly status: string;

    @ApiPropertyOptional({enum: [USER_ROLES.USER]})
    @IsEnum([USER_ROLES.USER])
    @IsOptional()
    readonly role: string;
}

export class userListfilterRequestDto extends PaginationRequestDto{

    @ValidateNested()
    @Type(() => userFilter)
    @IsObject()
    @IsOptional()
    readonly filters: userFilter;

    @ApiPropertyOptional({
        example: 'user_name',
        description: `'user_name', 'email', 'status', 'created_date', 'role', 'status','Admin_Sessions'`,
    })
    @IsEnum(['user_name', 'email', 'status', 'created_date', 'role', 'status', 'Admin_Sessions'])
    @ValidateIf((e) => e.sort_by !== null && e.sort_by !== '' && e.sort_by !== undefined)
    public readonly sort_by?: string;

    @ApiPropertyOptional({ example: 'ASC' }) 
    @IsEnum(['ASC', 'DESC', ''])
    @ValidateIf((e) => e.sort_type !== null && e.sort_type !== '' && e.sort_type !== undefined)
    public readonly sort_type?: string;

}

