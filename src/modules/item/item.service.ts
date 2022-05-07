import { Inject, Injectable } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { addItemRequestDto } from './dto/add.item.request.dto';
import { addItemResponseDto } from './dto/add.item.response.dto';

@Injectable()
export class ItemService {
    constructor(
        @Inject('ITEM_REPOSITORY') private readonly ITEM_REPOSITORY: typeof Item, 
    ){}

    async addItem(AddItemRequestDto: addItemRequestDto): Promise<addItemResponseDto>{

        const newItem = await new this.ITEM_REPOSITORY(AddItemRequestDto);
        return await newItem.save();
    }

    async removeItem(itemId: string): Promise<any>{
        return await this.ITEM_REPOSITORY.destroy({
            where: {
                id: itemId
            }, 
            // force: true
        });
    }
}
