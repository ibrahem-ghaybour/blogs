import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentGateway } from '../comment.gateway';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @Inject(forwardRef(() => CommentGateway))
    private readonly commentGateway: CommentGateway, // ✅ Fix Circular Dependency
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = new this.commentModel(createCommentDto);
    const savedComment = await newComment.save();
    this.commentGateway.server.emit('commentCreated', savedComment); // Notify clients
    return savedComment;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedComment) throw new NotFoundException('Comment not found');

    this.commentGateway.server.emit('commentUpdated', updatedComment); // Notify clients
    return updatedComment;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.commentModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Comment not found');

    this.commentGateway.server.emit('commentDeleted', { id }); // Notify clients
    return { message: 'Comment deleted successfully' };
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    data: Comment[];
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
  }> {
    const skip = (page - 1) * limit;
    const total = await this.commentModel.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const comments = await this.commentModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    return { data: comments, total, totalPages, page, pageSize: limit };
  }
}
