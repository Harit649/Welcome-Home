import { Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Admin } from './admin.entity';

@Table({
  tableName: 'user_activations',
  timestamps: true,
  paranoid: true,
})
export class AdminActivations extends Model<AdminActivations> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
  })
  token: string;

  @Column({
    type: DataType.DATE,
  })
  verified_date: Date;

  @CreatedAt
  created_date: Date;
  
  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date;
}
