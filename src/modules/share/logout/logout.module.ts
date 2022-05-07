import { Module } from '@nestjs/common';
import { adminSessionProvider } from 'src/providers/admin.Session.provider';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';

@Module({
  imports:[],
  controllers: [LogoutController],
  providers: [LogoutService, ...adminSessionProvider],
  exports:[LogoutService],
})
export class LogoutModule {}
