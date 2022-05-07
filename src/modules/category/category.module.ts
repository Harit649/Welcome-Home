import { Global, Module } from '@nestjs/common';
import { categoryProvider } from 'src/providers/category.provider';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Global() // to make this module global...
@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProvider],
  // exports: [CategoryService]      // if we want to use CategoryServices into different module, then we have to export it...
})
export class CategoryModule {}

