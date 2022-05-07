import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Caller } from 'src/decorators/caller.decorator';
import { Roles } from 'src/guard/roles.decorator';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { CategoryService } from './category.service';
import { addCategoryResponse } from './dto/add.category.response';
import { addCategoryRequestDto } from './dto/add.category.request';
import { categoryListResponseDto } from './dto/category.list.response.dto';
import { updateProfileResponseDto } from './dto/update.category.response.dto';
import { UpdateCategoryNameRequestDto } from './dto/update.category.request.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    /**
     * 
     * @param jwtTokenInterface  
     */

    @ApiOperation({ summary: 'retrive list of category' })
    @ApiResponse({ status: 200, description: 'Success', type: categoryListResponseDto})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('category')
    @UsePipes(ValidationPipe)
    @Get('category-list')
    @HttpCode(200)
    @Roles('SUPERADMIN') 
    
    protected async categoryList(@Caller() jwtTokenInterface: JwtTokenInterface): Promise<SuccessResponse<any>>{
        // using @Caller for roles varification purpose...
       const data = await this.categoryService.CategoryList(); 
       return { data, message: 'CATEGORY-LIST RETRIVED...'} 
    }

    /**
     * 
     * @param AddCategoryRequest 
     */
    @ApiOperation({ summary: 'add new category' })
    @ApiResponse({ status: 200, description: 'Success', type: addCategoryResponse})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('category')
    @UsePipes(ValidationPipe)
    @Post('add-category')
    @HttpCode(200)
    @Roles('SUPERADMIN')
    
    protected async AddCategory(
        @Body() AddCategoryRequestDto: addCategoryRequestDto): Promise<SuccessResponse<addCategoryResponse>>{

        const data = await this.categoryService.addCategory(AddCategoryRequestDto);
        return{ data, message: 'new category added successfully...'};
    }

    /**
     * 
     * @param updateCategoryNameRequestDto 
     */
    @ApiOperation({ summary: 'update category' })
    @ApiResponse({ status: 200, description: 'Success', type: updateProfileResponseDto})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('category')
    @UsePipes(ValidationPipe)
    @Put('update-category')
    @HttpCode(201)
    @Roles('SUPERADMIN')
    protected async UpdateCategory(
        @Body() updateCategoryNameRequestDto: UpdateCategoryNameRequestDto): Promise<SuccessResponse<updateProfileResponseDto>>{
        
        const data = await this.categoryService.updateCategory(updateCategoryNameRequestDto)
        return { data, message: 'Name updated successfully...'}
    }

    /**
     * 
     * @param userId 
     */
    @ApiOperation({ summary: 'Delete category' })
    @ApiResponse({ status: 200, description: 'Success'})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('category')
    @UsePipes(ValidationPipe)
    @Delete('/:id')
    @HttpCode(200)
    @Roles('SUPERADMIN')
    protected async DeleteCategory(@Param('id', new ParseUUIDPipe()) userId: string): Promise<SuccessResponse<any>>{
       
        const data = await this.categoryService.deleteCategory(userId);
        return { data, message: 'category delete successfully...'}
    }
}
