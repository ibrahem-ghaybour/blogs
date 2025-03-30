import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { CommentGateway } from './comment.gateway';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    forwardRef(() => CommentModule), // ✅ Fix Circular Dependency
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentGateway], // ✅ Ensure both are registered
  exports: [CommentService, CommentGateway], // ✅ Export them for use in other modules
})
export class CommentModule {}
