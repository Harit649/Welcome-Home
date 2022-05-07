import { Module } from '@nestjs/common';
import { personProvider } from 'src/providers/person.provider';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService, ...personProvider]
})
export class PersonModule {}
