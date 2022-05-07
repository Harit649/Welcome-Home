import { ApiProperty } from "@nestjs/swagger";
import { Item } from "src/entities/item.entity";

export class addItemResponseDto{

    @ApiProperty()
    id: string;

    @ApiProperty()
    userId:string;

    @ApiProperty()
    categoryId: string;

    @ApiProperty()
    itemName: string;

    @ApiProperty()
    ItemDescription: string;

    constructor(item: Item){
        this.id = item.id,
        this.userId = item.userId,
        this.categoryId = item.categoryId,
        this.itemName = item.itemName,
        this.ItemDescription = item.ItemDescription
    }
}