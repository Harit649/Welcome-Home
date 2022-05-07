import { Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/guard/roles.decorator';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { addPersonRequestDto } from './dto/addPersonRequestDto';
import { addPersonResponseDto } from './dto/addPersonResponseDto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService){}

    @ApiOperation({ summary: 'add new Person-data' })
    @ApiResponse({ status: 200, description: 'Success', type: addPersonResponseDto})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('Person')
    @UsePipes(ValidationPipe)
    @Post('add-person')
    @HttpCode(200)
    @Roles('SUPERADMIN')

    protected async addPersonData(AddPersonRequestDto: addPersonRequestDto): Promise<SuccessResponse<addPersonResponseDto>>{

        const data = await this.personService.AddPersonData(AddPersonRequestDto);

        return{data, message: "Person Data inserted Successfully.."};
    }
}
