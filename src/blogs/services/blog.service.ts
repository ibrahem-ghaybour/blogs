import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../schemas/blog.schema';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { Group } from '../../groups/schemas/group.schema';
@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
  ) {}

  async createBlog(blogData: CreateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.create(blogData);
    return blog;
  }
  async getBlogs(): Promise<Blog[]> {
    const blogs = await this.blogModel.find();
    return blogs;
  }
  async getBlog(id: string): Promise<Blog | null> {
    const blog = await this.blogModel.findById(id);
    return blog;
  }
  async updateBlog(id: string, blogData: CreateBlogDto): Promise<Blog | null> {
    const blog = await this.blogModel.findByIdAndUpdate(id, blogData, {
      new: true,
    });
    return blog;
  }
  async deleteBlog(id: string): Promise<Blog | null> {
    const blog = await this.blogModel.findByIdAndDelete(id);
    return blog;
  }
}
