import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UtilModule } from './util/util.module';
import { ShareModule } from './modules/share/share.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guards';
import { CategoryModule } from './modules/category/category.module';
import { ItemModule } from './modules/item/item.module';
import { GroupModule } from './modules/group/group.module';
import { PersonModule } from './modules/person/person.module';


@Module({
  imports: [DatabaseModule, UtilModule, AuthModule, ShareModule, ProfileModule, UserModule, CategoryModule, ItemModule, GroupModule, PersonModule], 
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {} 
