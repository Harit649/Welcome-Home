import { ApiProperty } from "@nestjs/swagger";
import { create } from "domain";
import { Category } from "src/entities/category.entity";

export class updateProfileResponseDto{
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    categoryName: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;

    constructor(category: Category){
        this.id = category.id,
        this.categoryName = category.categoryName,
        this.createdAt = category.createdAt,
        this.updatedAt = category.updatedAt,
        this.deletedAt = category.deletedAt
    }
}