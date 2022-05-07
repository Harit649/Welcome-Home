import { Column, CreatedAt, DataType, DeletedAt, HasMany, HasOne, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { USER_ROLES, USER_STATUS } from 'src/constant';
import { AdminActivations } from './adminactivation.entity';
import { AdminSessions } from './admin.Session.entity';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
}) 
export class Admin extends Model<Admin> {
  
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(30),
  })
  user_name: string;

  @Column({
    type: DataType.STRING(255),
  })
  password_hash: string;

  @Column({
    type: DataType.ENUM(...Object.values(USER_ROLES)),
    allowNull: false,
    defaultValue: USER_ROLES.SUPERADMIN,
  })
  role: USER_ROLES;

  @Column({
    type: DataType.ENUM(...Object.values(USER_STATUS)), 
    allowNull: false,
    defaultValue: USER_STATUS.ACTIVE,
  })
  status: USER_STATUS;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_email_verified: boolean;

  @Column({
    type: DataType.TEXT,
  })
  avatar: string;

  @CreatedAt
  created_date: Date;

  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date;

  @HasOne(() => AdminActivations)
  AdminActivation: AdminActivations;

  @HasMany(() => AdminSessions)
  AdminSessions: AdminSessions[];
}


