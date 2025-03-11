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
  async getBlogs(
    page = 1,
    limit = 10,
    search = '',
  ): Promise<{
    data: Blog[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const query: any = {};
    if (search) {
      query.$or = [
        { htmlText: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
      ];
    }
    const skip = (page - 1) * limit;
    const [blogs, total] = await Promise.all([
      this.blogModel.find(query).skip(skip).limit(limit).exec(),
      this.blogModel.countDocuments().exec(),
    ]);
    return {
      data: blogs,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async getBlog(id: string): Promise<Blog | null> {
    const blog = await this.blogModel.findById(id);
    return blog;
  }
  async getBlogsByGroup(groupId: string): Promise<Blog[]> {
    const Blogs = await this.blogModel.find({ groupId });
    return Blogs;
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
