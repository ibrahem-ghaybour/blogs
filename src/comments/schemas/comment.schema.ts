import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'comments',
  versionKey: false,
})
export class Comment {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  blogId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ type: String, required: false, default: undefined })
  avatar: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
