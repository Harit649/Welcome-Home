import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { col } from 'sequelize/types';
import { APPLICATION_TYPE, PERSON_STATUS } from 'src/constant';

@Table({
  tableName: 'person',
  timestamps: true,
  paranoid: true,
})

export class Person extends Model<Person>{
    
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM(...Object.values(PERSON_STATUS)),
    allowNull: false,
    defaultValue: PERSON_STATUS.INACTIVE
  })
  status: PERSON_STATUS;

  @Column({
    type: DataType.ENUM(...Object.values(APPLICATION_TYPE)),
    allowNull: false,
    defaultValue: APPLICATION_TYPE.ABC
  })
  type: APPLICATION_TYPE;


  @Column({
    type: DataType.STRING(255),
  })
  person_name: string;

  @Column({
    type: DataType.NUMBER
  })
  mobile_number: Number;

  @Column({
    type: DataType.STRING(255),
    unique: true,
  })
  email: string;


  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_email_verified: boolean;

  @Column({
    type: DataType.DATE,
  })
  date_of_birth: Date;

  @Column({
    type: DataType.STRING(255)
  })
  city: String

  @Column({
    type: DataType.STRING(255)
  })
  state: String;

  @Column({
    type: DataType.NUMBER
  })
  pin: Number;

  @CreatedAt
  created_date: Date;

  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date;
}



