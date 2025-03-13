import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from '../schemas/group.schema';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = new this.groupModel(createGroupDto);
    return newGroup.save();
  }

  async getAllGroups(
    page = 1,
    limit = 10,
    name: string,
    description: string,
  ): Promise<{
    data: Group[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    // const query: any = {};
    // if (search) {
    //   query.$or = [
    //     { name: { $regex: search, $options: 'i' } },
    //     { description: { $regex: search, $options: 'i' } },
    //   ];
    // }
    const skip = (page - 1) * limit;
    const [groups, total] = await Promise.all([
      this.groupModel
        .find(name ? { name } : description ? { description } : {})
        .skip(skip)
        .limit(limit)
        .exec(),
      this.groupModel.countDocuments().exec(),
    ]);
    if (groups.length === 0) {
      throw new NotFoundException('No groups found');
    }
    return {
      data: groups,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getGroupById(id: string): Promise<Group> {
    const group = await this.groupModel.findById(id).exec();
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async updateGroup(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const updatedGroup = await this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, { new: true })
      .exec();
    if (!updatedGroup) {
      throw new NotFoundException('Group not found');
    }
    return updatedGroup;
  }

  async deleteGroup(id: string): Promise<Group> {
    const deletedGroup = await this.groupModel.findByIdAndDelete(id).exec();
    if (!deletedGroup) {
      throw new NotFoundException('Group not found');
    }
    return deletedGroup;
  }
}
