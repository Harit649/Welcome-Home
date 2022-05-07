import { Body, Controller, Delete, HttpCode, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/guard/roles.decorator';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { addItemRequestDto } from './dto/add.item.request.dto';
import { addItemResponseDto } from './dto/add.item.response.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService,){}

    @ApiOperation({ summary: 'add new Item' })
    @ApiResponse({ status: 200, description: 'Success', type: addItemResponseDto})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('Items')
    @UsePipes(ValidationPipe)
    @Post('add-new-item')
    @HttpCode(200)
    @Roles('SUPERADMIN')
    
    protected async AddItem(@Body() AddItemRequestDto: addItemRequestDto): Promise<SuccessResponse<addItemResponseDto>>{
        
        const data =  await this.itemService.addItem(AddItemRequestDto);
        return { data, message: 'NewItem Added Successfully...'}
    }

    @ApiOperation({ summary: 'Delete item' })
    @ApiResponse({ status: 200, description: 'Success'})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('Items')
    @UsePipes(ValidationPipe)
    @Delete('/:id')
    @HttpCode(200)
    @Roles('SUPERADMIN')
    
    protected async RemoveItem(@Param('id', new ParseUUIDPipe()) itemId: string): Promise<SuccessResponse<any>>{

        const data = await this.itemService.removeItem(itemId)
        return { data, message: 'Item Deleted Successfully... '}
    }

}
