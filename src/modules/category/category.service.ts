import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { addCategoryRequestDto } from './dto/add.category.request';
import { addCategoryResponse } from './dto/add.category.response';
import { categoryListResponseDto } from './dto/category.list.response.dto';
import { UpdateCategoryNameRequestDto } from './dto/update.category.request.dto';
import { updateProfileResponseDto } from './dto/update.category.response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY') private readonly CATEGORY_REPOSITORY: typeof Category,   
  ) {}

  public async CategoryList(): Promise<categoryListResponseDto[]> {
    const categoryList = await this.CATEGORY_REPOSITORY.findAll();

    const data = categoryList.map((o) => {
      return new categoryListResponseDto(o);
    });
    return data;
  }

  public async addCategory(
    AddCategoryRequest: addCategoryRequestDto,
  ): Promise<addCategoryResponse> {
    const newcategory = await new this.CATEGORY_REPOSITORY(AddCategoryRequest);
    return await newcategory.save();
  }

  public async updateCategory(
    updateCategoryNameRequestDto: UpdateCategoryNameRequestDto,
  ): Promise<updateProfileResponseDto> {

    const data = await this.CATEGORY_REPOSITORY.findOne({
      where: { categoryName: updateCategoryNameRequestDto.categoryName },
    }); 
    
    if (!data) {
        throw new NotFoundException()
    }else{
      
      await this.CATEGORY_REPOSITORY.update(
        {
          categoryName: updateCategoryNameRequestDto.newCategoryName,
        },
        {
          where: { id: data.id },
        }
        );
      }

    return new updateProfileResponseDto(data);
  }

  public async deleteCategory(userId: string): Promise<any>{
    return await this.CATEGORY_REPOSITORY.destroy({
        where: {
            id: userId
        },
        // force: true        // this is use for hard delition from database...
    })
  }
}
