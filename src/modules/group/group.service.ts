import { Inject, Injectable } from '@nestjs/common';
import sequelize, { Op, OrderItem } from 'sequelize';
import { GROUP_STATUS } from 'src/constant';
import { Group } from 'src/entities/group.entity';
import { PaginationInterface } from 'src/interfaces/pagination.interface';
import { Helper } from 'src/util/helper.service';
import { craeteGroupRequestDto } from './dto/create.group.request.dto';
import { createGroupResponseDto } from './dto/create.group.response.dto';
import { groupFilter, groupListFilterRequestDto } from './dto/groupList.filter.request.dto';
import { groupListFilterResponseDto } from './dto/groupList.filter.response.dto';

@Injectable()
export class GroupService {
    constructor(@Inject('GROUP_REPOSITORY') private readonly GROUP_REPOSITORY : typeof Group,
        private readonly helper: Helper,

    ){}

    async createGroup(CraeteGroupRequestDto: craeteGroupRequestDto): Promise<createGroupResponseDto>{

        const newgroup = await new this.GROUP_REPOSITORY(CraeteGroupRequestDto);
        return newgroup.save();
    }

    async groupList(groupListFilterDto: groupListFilterRequestDto): Promise<PaginationInterface<groupListFilterResponseDto[]>>{
        const {limit, offset, pagenumber} = this.helper.getPaginateOffset(groupListFilterDto.currentPage, groupListFilterDto.recordPerPage);

        const filters = groupListFilterDto.filter || ({} as groupFilter);
        const where = {};

        if (filters.groupName) {
            where['groupName'] = { [Op.iLike]: '%' + filters.groupName + '%' };
        }

        if (filters.schemaName) {
            where['schemaName'] = filters.schemaName;
        }

        if (filters.groupStatus) {
            where['groupStatus'] = filters.groupStatus;
        }

        const count = await this.GROUP_REPOSITORY.count({ where });

        const groupData = await this.GROUP_REPOSITORY.findAll({
            attributes: ['id','groupName', 'groupSchema',  'status', [sequelize.fn('COUNT', 'houseCount.*'), 'count']],
            where: {
                groupStatus: GROUP_STATUS.ACTIVE && GROUP_STATUS.BLOCKED,
            }, 
            include: [
                {
                    model: this.GROUP_REPOSITORY,
                    attributes: [],
                    required: false,
                    on: sequelize.literal(`("id" = "Group"."id")`),
                }
            ],
            limit,
            offset,
            // order: [this.buildOrder(groupListFilterDto)],
            order: ['houseCount'],
            group: ['Admin.id'],
            raw: true,
            subQuery: false
        });

        const groupList = groupData.map((group:Group) => {
            return new groupListFilterResponseDto(group);
        });

        return this.helper.createPagination(count, pagenumber, limit, groupList)
    }

    // buildOrder(CraeteGroupRequestDto: groupListFilterRequestDto): OrderItem {
    //     if (CraeteGroupRequestDto.sort_by) {
    //       if (CraeteGroupRequestDto.sort_by === 'GROUP_REPOSITORY') {
    //         return [sequelize.col('count'), CraeteGroupRequestDto.sort_type || 'DESC'];
    //       }
    //       return [CraeteGroupRequestDto.sort_by, CraeteGroupRequestDto.sort_type || 'DESC'];
    //     } else {
    //       return ['created_date', CraeteGroupRequestDto.sort_type || 'DESC'];
    //     } 
    //   }
}
