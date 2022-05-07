import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/entities/category.entity";


export class categoryListResponseDto{

    @ApiProperty()
    categoryName: string;

    constructor(category: Category){

        this.categoryName = category.categoryName
    }
}