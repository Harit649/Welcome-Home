import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/entities/category.entity";

export class addCategoryResponse{

    @ApiProperty()
    categoryName: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor(category: Category){
        this.categoryName = category.categoryName, 
        this.createdAt = category.createdAt,
        this.updatedAt = category.updatedAt
    }
}