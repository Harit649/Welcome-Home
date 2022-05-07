import { Person } from "src/entities/person.entity";

export const personProvider = [
    {
        provide: 'PERSON_REPOSITORY',
        useValue: Person
    },
];
