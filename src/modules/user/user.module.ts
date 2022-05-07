import { Module } from '@nestjs/common';
import { AdminActivations } from 'src/entities/adminactivation.entity';
import { adminProviders } from 'src/providers/admin.provider';
import { adminSessionProvider } from 'src/providers/admin.Session.provider';
import { adminActivationsProviders } from 'src/providers/user.activation.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ...adminProviders, ...adminActivationsProviders, ...adminSessionProvider],
})
export class UserModule {}
