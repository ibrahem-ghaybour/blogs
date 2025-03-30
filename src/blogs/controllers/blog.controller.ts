import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Request,
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
    @Query('pageSize') pageSize: number = 10,
    @Query('search') search: string = '',
  ) {
    const blogs = await this.blogService.getBlogs(
      Number(page),
      Number(pageSize),
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
  async getBlogsByGroup(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Param('id') id: string,
    @Query('search') search: string = '',
  ) {
    try {
      const Blogs = await this.blogService.getBlogs(
        Number(page),
        Number(pageSize),
        search,
        id,
      );
      // if (!Blogs.data.length) throw new NotFoundException('Blogs not found');
      return Blogs;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  @Patch(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() body: CreateBlogDto,
    @Request() req,
  ) {
    try {
      const blog_from_db = await this.blogService.getBlog(id);
      if (req.user.role !== 'admin' && req.user._id !== blog_from_db?.userId)
        throw new NotFoundException('You are not admin');
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
