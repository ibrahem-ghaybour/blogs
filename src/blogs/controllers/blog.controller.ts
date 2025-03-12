import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  async createBlog(@Body() body: CreateBlogDto) {
    try {
      const blog = await this.blogService.createBlog(body);
      if (!blog) throw new NotFoundException('Blog not created');
      return blog;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get()
  async getBlogs(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    const blogs = await this.blogService.getBlogs(
      Number(page),
      Number(limit),
      search,
    );
    return blogs;
  }

  @Get(':id')
  async getBlog(@Param('id') id: string) {
    try {
      const blog = await this.blogService.getBlog(id);
      if (!blog) throw new NotFoundException('Blog not found');
      return blog;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  @Get('group/:id')
  async getBlogsByGroup(@Param('id') id: string) {
    try {
      const Blogs = await this.blogService.getBlogsByGroup(id);
      if (!Blogs.length) throw new NotFoundException('Blogs not found');
      return Blogs;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  @Patch(':id')
  async updateBlog(@Param('id') id: string, @Body() body: CreateBlogDto) {
    try {
      const blog = await this.blogService.updateBlog(id, body);
      if (!blog) throw new NotFoundException('Blog not found');
      return blog;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    try {
      const blog = await this.blogService.deleteBlog(id);
      if (!blog) throw new NotFoundException('Blog not found');
      return blog;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
