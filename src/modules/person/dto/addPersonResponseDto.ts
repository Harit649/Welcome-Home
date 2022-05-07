import { ApiProperty } from "@nestjs/swagger";
import { APPLICATION_TYPE, PERSON_STATUS } from "src/constant";
import { Person } from "src/entities/person.entity";

export class addPersonResponseDto{

    @ApiProperty()
    public readonly status: PERSON_STATUS;

    @ApiProperty()
    public readonly type: APPLICATION_TYPE;
    
    @ApiProperty()
    public readonly person_name: string;

    @ApiProperty()
    public readonly mobile_number: Number;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly date_of_birth: Date;

    @ApiProperty()
    public readonly city: String;

    @ApiProperty()
    public readonly state: String;

    @ApiProperty()
    public readonly pin: Number;

    constructor(person: Person){
        this.status = person.status,
        this.type = person.type,
        this.person_name = person.person_name,
        this.mobile_number = person.mobile_number,
        this.email = person.email,
        this.date_of_birth = person.date_of_birth,
        this.city = person.city,
        this.state = person.state,
        this.pin = person.pin
        
    }
}