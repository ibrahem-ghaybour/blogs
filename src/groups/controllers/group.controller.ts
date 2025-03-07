import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get()
  async getAllGroups() {
    const groups = this.groupService.getAllGroups();
    return groups;
  }

  @Get(':id')
  async getGroupById(@Param('id') id: string) {
    return this.groupService.getGroupById(id);
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: string) {
    return this.groupService.deleteGroup(id);
  }
}
