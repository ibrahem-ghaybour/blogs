import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Blog } from '../schemas/blog.schema';
import { CreateBlogDto } from '../dto/create-blog.dto';
// import { Group } from '../../groups/schemas/group.schema';
import { AppWebSocket } from 'src/app.websocket';
@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    private readonly appWebSocket: AppWebSocket,
  ) {}

  async createBlog(blogData: CreateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.create(blogData);
    return blog;
  }
  async getBlogs(
    page = 1,
    limit = 10,
    search = '',
    id?: string,
  ): Promise<{
    data: Blog[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    // Start with an empty query object
    const query: FilterQuery<Blog> = {};

    // Conditionally add the ID filter if it's present
    if (id) {
      query.groupId = id;
    }
    // Add search conditions if search text is provided
    if (search) {
      query.$or = [
        { htmlText: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    // Use the same query for fetching documents and counting
    const [blogs, total] = await Promise.all([
      this.blogModel.find(query).skip(skip).limit(limit).exec(),
      this.blogModel.countDocuments(query).exec(),
    ]);

    if (blogs.length === 0) {
      throw new NotFoundException('No blogs found');
    }

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

  async updateBlog(id: string, blogData: CreateBlogDto): Promise<Blog | null> {
    const blog = await this.blogModel.findByIdAndUpdate(id, blogData, {
      new: true,
    });

    if (null != blog)
      this.appWebSocket.publish({
        data: blog,
        event: 'app.blogs.blog-updated',
      });
    return blog;
  }
  async deleteBlog(id: string): Promise<Blog | null> {
    const blog = await this.blogModel.findByIdAndDelete(id);
    return blog;
  }
}
