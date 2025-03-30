import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Inject, forwardRef } from '@nestjs/common'; // ✅ Fix: Import from @nestjs/common

import { Server } from 'socket.io';
import { CommentService } from './services/comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@WebSocketGateway({
  cors: { origin: '*' }, // Allow all origins (Modify for security)
  credentials: true,
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService, // ✅ Fix Circular Dependency
  ) {}

  @SubscribeMessage('createComment')
  async handleCreate(@MessageBody() createCommentDto: CreateCommentDto) {
    const comment = await this.commentService.create(createCommentDto);
    this.server.emit('commentCreated', comment); // Notify all clients
    return comment;
  }

  @SubscribeMessage('updateComment')
  async handleUpdate(
    @MessageBody() data: { id: string; updateDto: UpdateCommentDto },
  ) {
    const updatedComment = await this.commentService.update(
      data.id,
      data.updateDto,
    );
    this.server.emit('commentUpdated', updatedComment); // Notify all clients
    return updatedComment;
  }

  @SubscribeMessage('deleteComment')
  async handleDelete(@MessageBody() id: string) {
    await this.commentService.remove(id);
    this.server.emit('commentDeleted', { id }); // Notify all clients
    return { message: 'Comment deleted successfully' };
  }
}
