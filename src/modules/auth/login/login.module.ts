import { Module } from '@nestjs/common';
import { adminProviders } from 'src/providers/admin.provider';
import { adminSessionProvider } from 'src/providers/admin.Session.provider';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports:[],
  controllers: [LoginController],
  providers: [LoginService, ...adminProviders, ...adminSessionProvider],
  exports:[LoginService],
})
export class LoginModule {}
