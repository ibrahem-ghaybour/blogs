import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get()
  async getAllGroups(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    const groups = this.groupService.getAllGroups(
      Number(page),
      Number(limit),
      search,
    );
    return groups;
  }

  @Get(':id')
  async getGroupById(@Param('id') id: string) {
    return this.groupService.getGroupById(id);
  }

  @Patch(':id')
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
