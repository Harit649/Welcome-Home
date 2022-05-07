import { Module } from '@nestjs/common';
import { groupProviders } from 'src/providers/group.provider';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, ...groupProviders]
})
export class GroupModule {}
