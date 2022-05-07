import { Module } from '@nestjs/common';
import { itemProvider } from 'src/providers/item.provider';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, ...itemProvider],
})
export class ItemModule {}
