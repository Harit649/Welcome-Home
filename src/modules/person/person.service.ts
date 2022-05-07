import { Inject, Injectable } from '@nestjs/common';
import promise from 'sequelize/types/lib/promise';
import { Person } from 'src/entities/person.entity';
import { addPersonRequestDto } from './dto/addPersonRequestDto';
import { addPersonResponseDto } from './dto/addPersonResponseDto';

@Injectable()
export class PersonService {

    constructor(
        @Inject('PERSON_REPOSITORY') private readonly PERSON_REPOSITORY: typeof Person,

    ){}

    async AddPersonData(AddPersonRequestDto: addPersonRequestDto): Promise<addPersonResponseDto>{

        const newPerson = await new this.PERSON_REPOSITORY(AddPersonRequestDto);
        return await newPerson.save();
    }
}
