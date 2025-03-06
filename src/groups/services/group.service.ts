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

  async getAllGroups(): Promise<Group[]> {
    return this.groupModel.find().populate('blogs').exec();
  }

  async getGroupById(id: string): Promise<Group> {
    const group = await this.groupModel.findById(id).populate('blogs').exec();
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
