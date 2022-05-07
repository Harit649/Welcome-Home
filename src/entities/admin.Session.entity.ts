import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Admin } from './admin.entity';

@Table({
  tableName: 'usersessions',
  timestamps: true,
  updatedAt: false,
})
export class AdminSessions extends Model<AdminSessions> {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  jwt_token: string;

  @CreatedAt
  created_date: Date;

  @BelongsTo(() => Admin)
  admin: Admin;
}
