import { Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Admin } from './admin.entity';

@Table({
  tableName: 'password_resets',
  timestamps: true,
  updatedAt: false,
})
export class PasswordReset extends Model<PasswordReset> {
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  user_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  token: string;

  @CreatedAt
  created_date: Date;
}
