import { Inject, Injectable} from '@nestjs/common';
import { USER_ROLES, USER_STATUS } from 'src/constant';
import { Admin } from 'src/entities/admin.entity';
import { userDetailResponseDto } from './dto/userDetail.Responce.dto';
import { userListResponseDto } from './dto/user.list.Responce.dto';
import { userStatusChangeResponseDto } from './dto/user.status.change.response.dto';
import { userFilter, userListfilterRequestDto } from './dto/user.list.filter.request.dto';
import { Helper } from 'src/util/helper.service';
import { Op, OrderItem} from 'sequelize';
import sequelize from 'sequelize';
import { AdminActivations } from 'src/entities/adminactivation.entity';
import { PaginationInterface } from 'src/interfaces/pagination.interface';
import { AdminSessions } from 'src/entities/admin.Session.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('ADMIN_REPOSITORY') private readonly ADMIN_REPOSITORY: typeof Admin,
        @Inject('ADMIN_ACTIVATIONS_REPOSITORY') private readonly ADMIN_ACTIVATIONS_REPOSITORY: typeof AdminActivations,
        @Inject('ADMIN_SESSIONS_REPOSITORY') private readonly ADMIN_SESSIONS_REPOSITORY: typeof AdminSessions,
        private readonly helper: Helper,
    ){}


    async userList(filterDto: userListfilterRequestDto): Promise<PaginationInterface<userListResponseDto[]>>{   
        const {limit, offset, pagenumber} = this.helper.getPaginateOffset(filterDto.currentPage, filterDto.recordPerPage);

        const filters = filterDto.filters || ({} as userFilter);
        const where = {};

        if (filters.email) {
            where['email'] = { [Op.iLike]: '%' + filters.email + '%' };
        }

        if (filters.user_name) {
            where['username'] = filters.user_name;
        }

        if (filters.status) {
            where['status'] = filters.status;
        }

        if (filters.role) {
            where['role'] = filters.role;
        }
        else{
            where['role'] = { [Op.in]: [USER_ROLES.USER] }
        }

        const count = await this.ADMIN_REPOSITORY.count({ where });

        const users = await this.ADMIN_REPOSITORY.findAll({
            attributes: ['id','email', 'role',  'status','user_name', 'created_date', [sequelize.fn('COUNT', 'AdminSessions.*'), 'count']],
            where: {
                role: USER_ROLES.USER,
            },
            include: [
                {
                    model: this.ADMIN_SESSIONS_REPOSITORY,
                    attributes: [],
                    required: false,
                    on: sequelize.literal(`("user_id" = "Admin"."id")`),
                }
            ],
            limit,
            offset,
            order: [this.buildOrder(filterDto)],
            group: ['Admin.id'],
            raw: true,
            subQuery: false
        }); 

        const listData = users.map((user:Admin) => {
            return new userListResponseDto(user);
        });

        return this.helper.createPagination(count, pagenumber, limit, listData)
    }

    buildOrder(filterDto: userListfilterRequestDto): OrderItem {
        if (filterDto.sort_by) {
          if (filterDto.sort_by === 'Admin_Sessions') {
            return [sequelize.col('count'), filterDto.sort_type || 'DESC'];
          }
          return [filterDto.sort_by, filterDto.sort_type || 'DESC'];
        } else {
          return ['created_date', filterDto.sort_type || 'DESC'];
        } 
      }


    async userDetail(userId: string): Promise<any>{
        const user =  await this.ADMIN_REPOSITORY.findOne({ where: { id : userId} });

       const adminActivation = await this.ADMIN_ACTIVATIONS_REPOSITORY.findAll({
           where: { [Op.or]: [{user_id: user.id}, {user_id: null}] },
           raw: true,
           nest: true,
        //    order: [
        //        ['is_email_verified', 'DESC'],
        //        ['AdminActivations', 'verified_date', 'DESC'],
        //        ['created_date', 'DESC']
        //    ],
       });

       const details = new userDetailResponseDto(user);
       return { user_details: details, adminActivation};
    }


    async statusChange(adminId: string): Promise<userStatusChangeResponseDto>{
        const admin = await this.ADMIN_REPOSITORY.findOne({
            where: {
                id: adminId,
            }
        });

        const currentstate = admin.status;
        const newStatus = currentstate === USER_STATUS.ACTIVE ? USER_STATUS.BLOCKED : USER_STATUS.ACTIVE;

        await this.ADMIN_REPOSITORY.update({ status: newStatus}, { where: { id: adminId }});
        admin.status = newStatus;

        return new userStatusChangeResponseDto(admin);
    }
}

