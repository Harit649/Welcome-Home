import { Module } from '@nestjs/common';
import { adminProviders } from 'src/providers/admin.provider';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, ...adminProviders]
})
export class ProfileModule {}
